import { redirect } from "next/dist/server/api-utils";
import { auth } from "../auth";
import Logout from "../_components/Logout";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <>
      <p>sadfdsaf</p>
      <Logout />
    </>
  );
}
