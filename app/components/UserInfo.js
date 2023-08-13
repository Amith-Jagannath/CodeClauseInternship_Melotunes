import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();
  if (status == "authenticated") {
    return (
      <div>
        <Image src={session?.user?.image} width={60} height={60} alt="Avatar" />
      </div>
    );
  }
}
