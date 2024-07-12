import { logout } from "@/app/_actions";

export default function Logout() {
  return (
    <form action={logout}>
      <button type="submit">Salir</button>
    </form>
  );
}
