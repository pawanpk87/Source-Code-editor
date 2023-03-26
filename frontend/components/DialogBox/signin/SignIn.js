import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { getError, validateEmail } from "@/util/UtilFuntion";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/app/store/slices/userSlice";

const useOutsideClick = (ref, setToggle) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

function SignIn({ toggleSignInDialogBox, setToggleSignInDialogBox }) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [toggle, setToggle] = useState(true);

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  const signinDialogBoxRef = useRef(null);
  useOutsideClick(signinDialogBoxRef, setToggleSignInDialogBox);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`api/register`, {
        params: {
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      if (response.data === "success") {
        showSuccess("Registered successfully. Please verify your account");
        authenticateUser();
      } else {
        showError("some error occured");
      }
    } catch (error) {
      showError(getError(error));
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`api/user/${input.email}`);
      const tempUserData = response.data;
      if (tempUserData !== null) {
        dispatch(setUser(tempUserData));
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        showError("some error occured");
      }
    } catch (error) {
      setLoading(false);
      showError(getError(error));
    }
  };

  const authenticateUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`api/authenticate`, {
        params: {
          email: input.email,
          password: input.password,
        },
        withCredentials: true,
        credentials: "include",
      });
      if (response.data === "success") {
        fetchUserData();
      } else {
        setLoading(false);
        showError("some error occured");
      }
    } catch (error) {
      setLoading(false);
      showError(getError(error));
    }
  };

  const handleRegister = () => {
    if (
      input.email === "" ||
      input.password === "" ||
      input.confirmPassword === "" ||
      input.firstName === "" ||
      input.lastName === ""
    ) {
      showError("Please fill all fields");
    } else if (validateEmail(input.email) === null) {
      showError("Invalid email");
    } else if (input.password !== input.confirmPassword) {
      showError("Password does not match");
    } else {
      registerUser();
    }
  };

  const handleLogin = () => {
    if (input.email === "" || input.password === "") {
      showError("Please fill all fields");
    } else if (validateEmail(input.email) === null) {
      showError("Invalid email");
    } else {
      authenticateUser();
    }
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  return (
    toggleSignInDialogBox && (
      <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-transparent">
        <div
          ref={signinDialogBoxRef}
          className="relative w-full md:w-2/6 bg-white shadow-2xl rounded-md p-5 h-full md:h-4/6"
        >
          <div
            className="absolute m-4 p-1 rounded-3xl right-0 top-0 text-gray-500 hover:bg-gray-300 cursor-pointer"
            onClick={() => setToggleSignInDialogBox(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-row items-center justify-evenly mb-3">
            <div
              className={`${
                toggle === true
                  ? "border-b-4 border-blue-600 text-black"
                  : "text-gray-400"
              } cursor-pointer hover:text-black`}
              onClick={() => setToggle(!toggle)}
            >
              <h1 className={`font-bold text-lg`}>Sign Up</h1>
            </div>

            <div
              className={`${
                toggle === false
                  ? "border-b-4 border-blue-600 text-black"
                  : "text-gray-400"
              } cursor-pointer hover:text-black`}
              onClick={() => setToggle(!toggle)}
            >
              <h1 className={`font-bold text-lg`}>Sign In</h1>
            </div>
          </div>
          {toggle ? (
            <div className="flex flex-col items-center justify-evenly">
              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="email"
                  name="email"
                  value={input.email}
                  placeholder="Email"
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>

              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
              </div>

              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  placeholder="First Name"
                  onChange={handleInput}
                />
              </div>

              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  placeholder="Last Name"
                  onChange={handleInput}
                />
              </div>

              <button
                className="w-4/5 p-2 mt-4 bg-blue-500 rounded-md hover:bg-blue-700 font-bold text-white flex items-center justify-center"
                onClick={handleRegister}
              >
                {loading === true ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-evenly">
              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="text"
                  name="email"
                  value={input.email}
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>

              <div className="w-4/5 p-2 border border-gray-300 rounded-md my-2">
                <input
                  className="outline-none text-gray-700 p-1 w-full"
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>

              <button
                className="w-4/5 p-2 mt-4 bg-blue-500 rounded-md hover:bg-blue-700 font-bold text-white flex items-center justify-center"
                onClick={handleLogin}
              >
                {loading === true ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          )}
        </div>
        <Toast ref={toast} />
      </div>
    )
  );
}

export default SignIn;
