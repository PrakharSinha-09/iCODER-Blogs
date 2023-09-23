export default function LoginPage(){
    return(
       <form className="login">
        <h2>Login</h2>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button>Login</button>
       </form>
    )
}