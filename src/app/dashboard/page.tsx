import { redirect } from "next/navigation";

// The /dashboard root redirects to login since role isn't determined yet
export default function DashboardIndexPage() {
  redirect("/login");
}
