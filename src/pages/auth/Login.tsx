const Login = () => {
    const handleLogin = async () => {
        window.open("http://localhost:9999/auth/google", "_self");
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
            <button className="bg-blue-100 px-4 py-2 rounded-md text-black font-semibold hover:opacity-75" onClick={handleLogin}>Login with Goggle</button>
        </div>
    )
}

export default Login