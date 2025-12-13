import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebaseConfig";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login");
        } catch (error) {
            console.log("error :  ", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
            <div>Sign Up</div>

            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="" id="" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800">Sign Up</button>

            <p>Already have an account <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline">Login</span></p>

        </div>
    )
}

export default Signup