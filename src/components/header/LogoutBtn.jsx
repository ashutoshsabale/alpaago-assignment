import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../../firebase/Firebase.jsx';

function LogoutBtn() {
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleLogout = () =>{
        firebase.signOutUser();
        navigate("/");
    }

    return (
        <div className="rounded-full flex flex-wrap flex-col">
            <button
                className="inline-block px-6 py-2 duration-200 hover:bg-red-400 rounded-full"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutBtn