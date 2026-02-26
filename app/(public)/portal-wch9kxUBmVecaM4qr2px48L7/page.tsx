import { redirect } from "next/navigation";

export default function SecretPortalPage() {
  // Redirect to admin login
  redirect("/login");
}
