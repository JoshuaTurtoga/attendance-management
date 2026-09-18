import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error("Missing env vars")
  process.exit(1)
}

const supabase = createClient(url, key)

async function test() {
  console.log("Fetching users...")
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) {
    console.error("Error fetching users:", userError)
    return
  }
  
  if (users.users.length === 0) {
    console.log("No users found.")
    return
  }

  const testUser = users.users[0]
  console.log("Test user ID:", testUser.id)

  console.log("Attempting to upsert role for user...")
  const { data, error } = await supabase
    .from('user_roles')
    .upsert({ id: testUser.id, role: 'instructor' })
    .select()

  if (error) {
    console.error("UPSERT ERROR:", error)
  } else {
    console.log("UPSERT SUCCESS:", data)
  }
}

test()
