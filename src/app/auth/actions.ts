"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Return the error message to the client via a redirect with query param
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Fetch the user's role to redirect them to the correct dashboard
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?error=Authentication+failed");

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", user.id)
    .single();

  revalidatePath("/", "layout");

  const role = roleData?.role ?? "student";
  if (role === "admin") redirect("/dashboard/admin");
  if (role === "instructor") redirect("/dashboard/instructor");
  redirect("/dashboard/student");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  // After signup, Supabase sends a confirmation email.
  // Redirect to a confirmation notice page.
  redirect("/login?message=Check+your+email+to+confirm+your+account");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
