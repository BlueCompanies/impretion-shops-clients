"use server";

import { signIn, signOut } from "../auth";

export async function socialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirect: "/client-data" });
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function credentialsLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
