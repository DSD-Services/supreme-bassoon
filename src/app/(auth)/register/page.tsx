import { registerAction } from "@/features/auth/actions/register.action";

export default function Page() {
  return (
    <div>
      <h1>Register Page</h1>

      <form action={registerAction}>
        <div>
          <div>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" />
          </div>

          <div>
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" defaultValue="CLIENT">
              <option value="CLIENT">CLIENT</option>
              <option value="TECHNICIAN">TECHNICIAN</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" />
          </div>

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
