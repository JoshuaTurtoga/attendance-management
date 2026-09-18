'use server'

import { createClient as createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

// ─── Auth Guard ───────────────────────────────────────────────────────────────
async function requireAdmin() {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Not authenticated')

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!roleData || roleData.role !== 'admin') {
    throw new Error('Not authorized: Admin access required.')
  }
  return { supabase, adminClient: createAdminClient() }
}

// ─── Get all users (joined with roles and profiles) ──────────────────────────
export async function getUsers() {
  const { supabase } = await requireAdmin()
  const adminClient = createAdminClient()

  // Get all users from auth.users via admin API
  const { data: authUsers, error: authError } = await adminClient.auth.admin.listUsers()
  if (authError) throw new Error(`Failed to fetch users: ${authError.message}`)

  // Get all roles using adminClient to bypass RLS
  const { data: roles } = await adminClient.from('user_roles').select('id, role')
  // Get all profiles using adminClient to bypass RLS
  const { data: profiles } = await adminClient.from('user_profiles').select('id, first_name, last_name')

  const rolesMap = new Map(roles?.map((r) => [r.id, r.role]) ?? [])
  const profilesMap = new Map(profiles?.map((p) => [p.id, p]) ?? [])

  return authUsers.users.map((u) => {
    const profile = profilesMap.get(u.id)
    const firstName = profile?.first_name ?? ''
    const lastName = profile?.last_name ?? ''
    const displayName = firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : u.email?.split('@')[0] ?? 'Unknown'

    return {
      id: u.id,
      email: u.email ?? '',
      name: displayName,
      role: (rolesMap.get(u.id) ?? 'student') as 'admin' | 'instructor' | 'student',
      createdAt: u.created_at,
      emailConfirmed: !!u.email_confirmed_at,
    }
  })
}

// ─── Create Instructor ────────────────────────────────────────────────────────
export async function createInstructor(formData: FormData) {
  const { adminClient } = await requireAdmin()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email || !password || !firstName || !lastName) {
    return { success: false, message: 'All fields are required.' }
  }

  const { data: newUserData, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError || !newUserData.user) {
    return { success: false, message: createError?.message ?? 'Failed to create user.' }
  }

  const newUserId = newUserData.user.id

  // Override the default 'student' role set by the DB trigger (or create if missing)
  const { error: roleError } = await adminClient
    .from('user_roles')
    .upsert({ id: newUserId, role: 'instructor' })

  if (roleError) {
    return { success: false, message: `Role assignment failed: ${roleError.message}` }
  }

  // Create instructor profile
  const { error: profileError } = await adminClient
    .from('user_profiles')
    .insert({ id: newUserId, first_name: firstName, last_name: lastName })

  if (profileError) {
    return { success: false, message: `Profile creation failed: ${profileError.message}` }
  }

  revalidatePath('/dashboard/admin/users')
  return { success: true, message: `Instructor account for ${firstName} ${lastName} created successfully.` }
}

// ─── Create Student ───────────────────────────────────────────────────────────
export async function createStudent(formData: FormData) {
  const { adminClient } = await requireAdmin()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email || !password || !firstName || !lastName) {
    return { success: false, message: 'All fields are required.' }
  }

  const { data: newUserData, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError || !newUserData.user) {
    return { success: false, message: createError?.message ?? 'Failed to create user.' }
  }

  const newUserId = newUserData.user.id

  // Role defaults to 'student' via the DB trigger, just create the profile
  const { error: profileError } = await adminClient
    .from('user_profiles')
    .insert({ id: newUserId, first_name: firstName, last_name: lastName })

  if (profileError) {
    return { success: false, message: `Profile creation failed: ${profileError.message}` }
  }

  revalidatePath('/dashboard/admin/users')
  return { success: true, message: `Student account for ${firstName} ${lastName} created successfully.` }
}

// ─── Delete User ──────────────────────────────────────────────────────────────
export async function deleteUser(userId: string) {
  const { adminClient } = await requireAdmin()

  const { error } = await adminClient.auth.admin.deleteUser(userId)
  if (error) return { success: false, message: error.message }

  revalidatePath('/dashboard/admin/users')
  return { success: true, message: 'User deleted successfully.' }
}

// ─── Change User Role ─────────────────────────────────────────────────────────
export async function updateUserRole(userId: string, role: 'admin' | 'instructor' | 'student') {
  console.log(`[updateUserRole] Attempting to change role for user ${userId} to ${role}`);
  try {
    const { adminClient, supabase } = await requireAdmin()
    console.log(`[updateUserRole] requireAdmin passed`);

    // Server-side guard: prevent an admin from changing their own role
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.id === userId) {
      console.log(`[updateUserRole] Blocked self-role change`);
      return { success: false, message: 'You cannot change your own role.' }
    }

    const { data, error } = await adminClient
      .from('user_roles')
      .upsert({ id: userId, role })
      .select()

    if (error) {
      console.error(`[updateUserRole] Upsert error:`, error);
      return { success: false, message: error.message }
    }

    console.log(`[updateUserRole] Upsert success:`, data);
    revalidatePath('/dashboard/admin/users')
    return { success: true, message: 'Role updated successfully.' }
  } catch (err: any) {
    console.error(`[updateUserRole] Caught exception:`, err);
    return { success: false, message: err.message || 'An unexpected error occurred.' }
  }
}
