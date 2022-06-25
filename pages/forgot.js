import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [istoken, setIstoken] = useState(false);
  const [sdisable, setSdisable] = useState(false)
  const [udisable, setUdisable] = useState(false)


  const handelChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const sendSetEmail = async (e) => {
    e.preventDefault();
    setSdisable(true)
    let data = { email: email, sendMail: true };
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/forgot`;

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    setSdisable(false)
    if (response.scusses) {
      setEmail("");
      toast.success(response.msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!response.scusses) {
      setEmail("");
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault()
    setUdisable(true)
    let data = {
      cpassword,
      npassword,
      Vtoken: false,
      token: router.query.token,
    };
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/createpassword`;

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    setUdisable(false)
    if (response.scusses) {
      setNpassword("");
      setCpassword("");
      toast.success(response.msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!response.scusses) {
      setNpassword("");
      setCpassword("");
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const checktoken = async () => {
      let data = { Vtoken: true, token: router.query.token };
      let url = `${process.env.NEXT_PUBLIC_HOST}/api/createpassword`;
  
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      setIstoken(response.istoken);
    };

    if (localStorage.getItem("myuser")) {
      router.push("/");
    }


    if (router.query.token) {
      checktoken();
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="leading-loose ">
        <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <div className="max-w-md w-full space-y-8">
            {!router.query.token && (
              <>
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Forgot your password
                  </h2>
                </div>

                <form
                  className="mt-8 space-y-6"
                  onSubmit={sendSetEmail}
                  method="POST"
                >
                  <Head>
                    <title>Forgot Password</title>
                    <meta
                      name="description"
                      content="Put code to get change password email"
                    />
                    <link rel="icon" href="/ecommerce.png" />
                  </Head>
                  <input type="hidden" name="remember" value="true" />
                  <div className="mt-2">
                    <label
                      className="leading-7 text-sm text-gray-600 sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email address"
                      aria-label="Email"
                      autoComplete="current-email"
                      onChange={handelChange}
                      value={email}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link href={"/login"}>
                        <a className="font-bold text-black-600 text-md text-purple-700 hover:text-purple-500 ">
                          Login
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={sdisable}
                      className="disabled:bg-purple-300 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {!sdisable && 'Continue'}
                  {sdisable &&  'Sending....'}
                      
                    </button>
                  </div>
                </form>
              </>
            )}

            {router.query.token && (
              <div>
                <Head>
                  <title>Change Password</title>
                  <meta name="description" content="Change your Password" />
                  <link rel="icon" href="/ecommerce.png" />
                </Head>

                {istoken && (
                  <>
                    {" "}
                    <div>
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {" "}
                        Create New Password
                      </h2>
                    </div>
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={resetPassword}
                      method="POST"
                    >
                      <input type="hidden" name="remember" value="true" />
                      <div className="mt-2">
                        <label
                          className="leading-7 text-sm text-gray-600 sr-only"
                          htmlFor="npassword"
                        >
                          New Password
                        </label>
                        <input
                          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          id="npassword"
                          name="npassword"
                          type="password"
                          required
                          placeholder="New Password"
                          aria-label="Password"
                          autoComplete="current-password"
                          onChange={handelChange}
                          value={npassword}
                        />
                      </div>

                      <div className="mt-2">
                        <label
                          className="leading-7 text-sm text-gray-600 sr-only"
                          htmlFor="cpassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          id="cpassword"
                          name="cpassword"
                          type="password"
                          required
                          placeholder="Confirm Password"
                          aria-label="Password"
                          autoComplete="current-password"
                          onChange={handelChange}
                          value={cpassword}
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={udisable}
                          className="disabled:bg-purple-300 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                              className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          {!udisable && 'Submit'}
                          {udisable && 'Updating....'}
                        </button>
                      </div>
                    </form>{" "}
                  </>
                )}

                {!istoken && (
                  <div className="text-red-600 font-bold text-xl">
                    Token Expires!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
