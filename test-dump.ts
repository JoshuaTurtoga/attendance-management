import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error("Missing env vars")
  process.exit(1)
}

const supabase = createClient(url, key)

async function test() {
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) return console.error(userError)

  const { data: roles, error: rolesError } = await supabase.from('user_roles').select('*')
  if (rolesError) return console.error(rolesError)

  console.log("USERS IN AUTH:")
  users.users.forEach(u => console.log(u.email, u.id))

  console.log("\nROLES IN DB:")
  roles.forEach(r => console.log(r))
}

test()
