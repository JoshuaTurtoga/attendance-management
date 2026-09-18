import { getUsers } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const users = await getUsers();
  return <UsersClient initialUsers={users} currentUserId={user?.id ?? ""} />;
}
