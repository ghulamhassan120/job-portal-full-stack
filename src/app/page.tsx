import { getCurrentUser } from "@/features/auth/server/auth.queries";
import Image from "next/image";

export default async function Home() {
  const user=await getCurrentUser()
  
  console.log(user)
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
