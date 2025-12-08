import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin, setLoading, setUser, theme } = useAuth();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    // const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("User logged in successfully!");
        form.reset();
        navigate(location?.state?.from?.pathname || "/");
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        const saveUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          createdAt: new Date(),
        };

        //  SAVE GOOGLE USER TO DATABASE
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        });

        setUser(user);
        toast.success("User logged in successfully!");
        navigate(location?.state?.from?.pathname || "/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  // const handleGoogleLogin = () => {
  //   googleLogin()
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);
  //       toast.success("User logged in successfully!");
  //       navigate(location?.state?.from?.pathname || "/");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       // console.error(error);
  //       toast.error(error.message);
  //       setLoading(false);
  //     });
  // };

  return (
    <div className=" bg-linear-to-r from-black to-warning mt-6  text-center min-h-screen flex items-center justify-center">
      <div
        className={`p-6 ${
          theme === "light" ? "bg-white" : "bg-gray-200"
        } rounded-lg shadow-sm space-y-3 w-4/5 md:w-1/3 lg:w-1/3 mx-auto border border-base-300`}
      >
        <h1 className="text-2xl font-bold text-info">Login here!</h1>
        <form
          onSubmit={handleLogin}
          className={` ${
            theme === "light" ? "bg-white" : "bg-gray-200"
          }  space-y-2`}
        >
          <input
            type="email"
            className={`input w-full ${
              theme === "light"
                ? "input-bordered"
                : "input-bordered bg-white text-black"
            }`}
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`input w-full pr-10 ${
                theme === "light"
                  ? "input-bordered"
                  : "input-bordered bg-white text-black"
              }`}
              name="password"
              placeholder="Your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-emerald-600"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          <div>
            <Link
              to="/forgot-password"
              state={{ email }}
              className="link link-hover text-info font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className={`btn btn-outline rounded-full px-6 ${
              theme === "light" ? "" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        </form>

        <div>
          <span
            className={`${theme === "light" ? "text-black" : "text-gray-800"}`}
          >
            New here?
          </span>{" "}
          <Link to="/register" className="text-info font-medium underline">
            Register
          </Link>
        </div>
        <div>
          <p
            className={`${theme === "light" ? "text-black" : "text-gray-800"}`}
          >
            or
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-blue-300"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
