import Footer from "../components/Footer";
import ualogo from "../resources/ualogo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../components/LoadingScreen";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedErr, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      setLoading(true);
      await handleLogin(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.response?.status || "Unknown error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start background">
      <div className="flex flex-col justify-center items-center mt-4 loginCon">
        <h1 className="text-5xl font-bold text-slate-800 ">ALUMNI ENGAGEMENT HUB</h1>
        <img src={ualogo} alt="UA Logo" className="mt-4 rounded-full" width={250} />

        <form onSubmit={handleSubmit}>
          <div className="p-8 flex flex-col items-center">
            <input className="text-xl rounded-md p-2 w-80 outline-none" placeholder="Email" type="email" required
            value={email} onChange={(event) => {setEmail(event.target.value); setError(null)}} />
            <input className="text-xl rounded-md p-2 w-80 outline-none mt-4" placeholder="Password" type="password" required
            value={password} onChange={(event) => {setPassword(event.target.value); setError(null)}} />
          </div>

          <div className="p-8 flex flex-col items-center">
            <button type="submit" className={`font-bold rounded-lg text-lg  w-48 h-16 bg-[#374151] text-[#ffffff] justify-center
              ${isLoading? "" : "btn"}`} disabled={isLoading}> {isLoading? <LoadingScreen /> : "Log in" }
            </button>

            <div className="flex justify-center w-48 items-center">
              <div className="border-t border-black w-full" />
                <span className="px-4 text-black-400">or</span>
              <div className="border-t border-black w-full" /> 
            </div>

            <Link to="/signup">
              <button className="font-bold rounded-lg text-lg  w-48 h-16 bg-[#374151] text-[#ffffff] justify-center
                btn">Sign Up
              </button>
            </Link>
          </div>
        </form>
        {loggedErr == 401 ? (<p className="text-red-500">Your username or password is incorrect!</p>) : 
        (<p className="text-red-500 opacity-0">Hidden</p>)}
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
