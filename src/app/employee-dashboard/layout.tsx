import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({ children }: Readonly<{children:React.ReactNode}>) {
    const user=await getCurrentUser()
    if(!user) return redirect("/login")
    if(user?.role!=="employee") return redirect("/dashboard/applicant")
  return (
    <>
        {children}
    </>
  );
}
