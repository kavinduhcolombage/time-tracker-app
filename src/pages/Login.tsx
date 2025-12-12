import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
    const [email, setEmial] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("button clicked");
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[60vh]">
            <div className="text-2xl font-semibold mb-10">Login</div>

            <div className="flex gap-3">
                <div>Email:</div>
                <input type="text" value={email} onChange={(e) => setEmial(e.target.value)} className="border p-1" />
            </div>

            <div className="flex gap-3">
                <div>Password:</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-1" />
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-800" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login
