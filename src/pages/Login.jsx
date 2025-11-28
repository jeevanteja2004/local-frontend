import React,{useState} from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

import { toast } from "react-toastify";
const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();
    
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "https://localnest-backend.onrender.com/api/auth/login",
      { email, password }
    );

    if (response.data.success) {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.id);

  localStorage.setItem("user", JSON.stringify({
    id: response.data.id,
    username: response.data.name,
    email: response.data.email
  }));

  
  navigate("/");
  toast.success("Login Successful");
   return res.json({
    success: true,
    id: user._id,
    username: user.username,
    email: user.email,
    token: token
  });
}
  } catch (err) {
    
    
    toast.error(err.response.data.message);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="border shadow p-6 w-80 bg-white rounded border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-500 rounded " placeholder="Enter Email" required/>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700" >Password</label>
                <input type="password" name="password" id="password"    onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-500 rounded" placeholder="********" required/>
            </div>
            <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 text-white py-2">Login</button>
            <p className="text-center">Don't have an account?<Link to="/register" className="text-blue-800 font-bold"> Register</Link></p>
            </div>
        </form>
    </div>
    </div>
    );
};

export default Login;