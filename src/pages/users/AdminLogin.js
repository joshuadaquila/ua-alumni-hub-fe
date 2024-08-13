import Footer from "../../components/Footer";
import ualogo from "../../resources/ualogo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../../components/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = ({ handleAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedErr, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await handleAdminLogin(username, password);
      if (response.status === 200) {
        navigate('/admin/dashboard');
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setError(error.response?.status || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-red-950">
      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className="text-5xl font-bold text-white">ALUMNI HUB</h1>
        <h1 className="text-5xl font-bold text-white">(Alumni Tracer and Engagement Hub)</h1>
        <h3 className="text-white text-2xl">Administrator Control</h3>
        <img src={ualogo} alt="UA Logo" className="mt-4 rounded-full" width={250} />

        <form onSubmit={handleSubmit} className="bg-white rounded-md m-2 shadow-md">
          <div className="p-8 flex flex-col items-center">
            <input
              className="text-xl p-2 w-80 outline-none border bg-slate-200"
              placeholder="Username"
              type="text"
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(null);
              }}
            />
            <div className="relative mt-4 w-80">
              <input
                className="text-xl p-2 w-80 outline-none border bg-slate-200"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(null);
                }}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 cursor-pointer opacity-50"
                size="sm"
              />
            </div>
          </div>

          <div className="p-4 flex flex-col items-center">
            <button
              type="submit"
              className={`font-bold rounded-lg text-lg w-48 h-16 bg-[#374151] text-[#ffffff] justify-center ${
                isLoading ? "" : "btn"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "" : <FontAwesomeIcon icon={faSignIn} />} {isLoading ? <LoadingScreen /> : "Log in"}
            </button>
          </div>
        </form>
        {loggedErr == 401 ? (
          <p className="text-red-500">Your username or password is incorrect!</p>
        ) : (
          <p className="text-red-500 opacity-0">Hidden</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
