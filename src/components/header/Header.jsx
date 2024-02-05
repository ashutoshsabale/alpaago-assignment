import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useFirebase } from '../../firebase/firebase';

function Header(){
    const navigate = useNavigate();
    const firebase = useFirebase();

    const authStatus = firebase.loggedInUser ? true : false;

    //array of navItems
    const navItems = [{
                name : 'Home',
                path : '/',
                active : !authStatus
        },{
                name : 'Login',
                path : '/login',
                active : !authStatus
        },{
                name : 'Signup',
                path : '/register',
                active : !authStatus
        },
    ]

    return(
        <header className="py-3 shadow bg-[#fafafa] w-full p-32 ">
            <nav className="flex justify-center items-center">
                <div className="mr-4 text-black text-2xl font-bold">
                    NavBar
                </div>

                <ul className="flex ml-auto">
                    {/* Mapping through navItems */}
                    {navItems.map((item)=>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={()=>navigate(item.path)}
                                    className="inline-block px-6 mx-1 py-2 duration-200 hover:bg-[#1e9fab65] active:bg-[#1e9fab]-200 focus:outline-none focus:ring-1 focus:ring-[#1e9fabb9] rounded-2xl"
                                >{item.name}</button>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header