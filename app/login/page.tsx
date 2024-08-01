// app/login/page.tsx
import Form from "@/components/auth/LoginForm";
import Link from "next/link";
import { auth } from "@/auth";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";


const LoginPage = async () => {
 // const authRequest = auth.handleRequest("GET", context);
  //const session = await authRequest.validate();
  //if (session) redirect("/");
  return (
    <>
      <h1>Sign in</h1>
      <Form action="/api/login">
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" />
      </Form>
      <Link href="/signup">Create an account</Link>
    </>
  );
};

export default LoginPage;
