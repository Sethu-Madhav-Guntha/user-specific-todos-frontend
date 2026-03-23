import { useNavigate } from "react-router-dom";
function Login() {
  const navigateFn = useNavigate();
  const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;
  const handleLoginFormSubmit = () => {
    event.preventDefault();
    const loginForm = new FormData(event.target);
    const loginFormData = Object.fromEntries(loginForm.entries());
    event.target.reset();
    fetch(`${BACKEND_BASE_URI}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
          navigateFn("/");
        }
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="emailId">Email: </label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Provide Email Here"
          required
        />
        <br />
        <label htmlFor="passwordId">Password: </label>
        <input
          type="password"
          name="password"
          id="passwordId"
          placeholder="Provide Password Here"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
