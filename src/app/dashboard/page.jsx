import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <h2>This is dash board</h2>
    </div>
  );
};

export default DashboardPage;
