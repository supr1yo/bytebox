import './signup.css'
export default function SignupPage() {

  return (
    <>
      <div className="card">
        <h2>
        Sign up
        </h2>
          <form>
            <input type="text" placeholder="Username" name="username" id="username" required/>
            <input type="email" placeholder="Email" name="email" id="email" required/>
            <input type="password" placeholder='Password' name="password" id="password" required/>
            <button type="submit">Sign up</button>
          </form>
          <p>Already have an account? <a href="">Log in.</a></p>
      </div>
    </>
  )
}
