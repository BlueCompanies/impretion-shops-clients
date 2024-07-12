"use client";

import { credentialsLogin, socialLogin } from "@/app/_actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await credentialsLogin(formData);
      if (!!response.error) {
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
          </label>
        </div>
      </form>
      <form action={socialLogin}>
        <button type="submit" name="action" value="google">
          Sign in with Google
        </button>
      </form>
    </>
  );
}
