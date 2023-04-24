import CustomButton from "../../components/global/CustomButton";

const Login = () => {
    const handleLogin = async () => {
        window.open("http://localhost:9999/auth/google", "_self");
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-700">
            <CustomButton handleClick={handleLogin}>Login with Goggle</CustomButton>
        </div>
    )
}

export default Login