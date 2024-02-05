import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase.jsx";

function Register() {

    const navigate = useNavigate();
    const firebase = useFirebase();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //function to handleForm submittion
    const handleSubmit = async (e) => {
        e.preventDefault();
        firebase.signupUserWithEmailAndPassword(email, password);
        await firebase.collectData(username, email);
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
                        Register
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="mt-5"
                >
                    <div className="space-y-5">
                        <div className="w-full">
                            <label className="inline-block mb-1 pl-1" htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                                id="username"
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="inline-block mb-1 pl-1" htmlFor="username">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                                id="email"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
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
                                onChange={(e)=>{setPassword(e.target.value)}}
                                required
                            />
                        </div>


                        <button type="submit" className="w-full border bg-blue-500 text-white">
                            Sign up
                        </button>



                    </div>
                </form>
                <p className="mt-5 text-center text-base text-black">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
