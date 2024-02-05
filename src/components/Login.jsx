import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFirebase } from "../firebase/Firebase.jsx";

function Login() {
    const navigate = useNavigate();
    const firebase = useFirebase();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null)

    //handling form submittion
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.loginUserWithEmailAndPassword(username, password);
        console.log("Status : ", firebase.loggedInUser);
        navigate("/user-info");
    };

    useEffect(()=>{
        if(firebase.loggedInUser) navigate("/user-info");
    }, [firebase.loggedInUser])

    return (
        <div className="flex items-center justify-center w-full my-8 text-black">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-16 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="text-3xl text-blue-600 font-bold inline-block w-ful max-w-[100px]">
                        Login
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                Sign in to your account
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="mt-5"
                >
                    <div className="space-y-5">
                        {alert && (
                            <div className="fixed top-28 border-black rounded-md shadow-md bg-red-300 w-1/4 flex justify-between px-5 py-2 ">
                                <span className="text-bold">{alert}</span>
                                <span className="cursor-pointer " onClick={()=>setAlert(null)}>❌</span>
                            </div>
                        )}
                        <div className="w-full">
                            <label className="inline-block mb-1 pl-1" htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="inline-block mb-1 pl-1" htmlFor="username">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>


                        <button type="submit" className="w-full border bg-blue-500 text-white">
                            Sign in
                        </button>

                        <button onClick={() => firebase.signupWithGoogle()} className="w-full border bg-red-500 text-white">
                            Sign in with Google
                            {/*  TODO: implement navigation */}
                        </button>
                    </div>
                </form>
                <p className="text-center pt-7">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
