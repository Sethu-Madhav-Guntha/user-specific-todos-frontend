import { useNavigate } from "react-router-dom";

function Signup() {
  const navigateFn = useNavigate();
  const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;
  const handleLoginFormSubmit = () => {
    event.preventDefault();
    const loginForm = new FormData(event.target);
    const loginFormData = Object.fromEntries(loginForm.entries());
    // console.log(loginFormData);
    event.target.reset();
    fetch(`${BACKEND_BASE_URI}/users/signup`, {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="usernameId">Username:</label>
        <input
          type="text"
          name="username"
          id="usernameId"
          placeholder="Provide Username Here"
          required
        />
        <br />
        <label htmlFor="emailId">Email:</label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Provide Email Here"
          required
        />
        <br />
        <label htmlFor="passwordId">Password:</label>
        <input
          type="password"
          name="password"
          id="passwordId"
          placeholder="Provide Password Here"
          required
        />
        <br />
        <span>Role: </span>
        <input type="radio" name="role" id="adminId" value="Admin" />
        <label htmlFor="adminId">Admin</label>
        <input
          type="radio"
          name="role"
          id="userId"
          value="User"
          defaultChecked
        />
        <label htmlFor="userId">User</label>
        <br />
        <button type="submit">Singup</button>
      </form>
    </div>
  );
}
export default Signup;
