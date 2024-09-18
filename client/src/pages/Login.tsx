import './login.css'
export default function LoginPage() {

  return (
    <>
      <div className="card">
        <h2>
          Login
        </h2>
          <form>
            <input type="text" placeholder="Username" name="username" id="username" required/>
            <input type="password" placeholder='Password' name="password" id="password" required/>
            <button type="submit">Login</button>
          </form>
          <p>New user? <a href="">Create an account.</a></p>
      </div>
    </>
  )
}
