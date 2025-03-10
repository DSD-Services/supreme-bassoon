import { loginAction } from "@/features/auth/actions/login.action";

export default function LoginPage() {
  return (
    <form action={loginAction}>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
      </div>

      <button type="submit">Log In</button>
    </form>
  );
}
