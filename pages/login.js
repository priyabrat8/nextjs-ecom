import React, { useState,useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disable, setDisable] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('myuser')) {
      router.push('/')
    }

  }, [router])
  
  const handleChange = (e) => {

   if (e.target.name === 'email') {
      setEmail(e.target.value)
      
    }

    else if (e.target.name === 'password') {
      setPassword(e.target.value)
        
      }
      
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisable(true)
    
    const data = {
      email,
      password
    }

  let url = `${process.env.NEXT_PUBLIC_HOST}/api/login`

    
      let res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
         
        },
        body: JSON.stringify(data) 
      });
      let response = await res.json()
 
    setEmail('')
    setPassword('')
    setDisable(false)

    if (response.type) {
      localStorage.setItem('myuser' , JSON.stringify({token :response.token, email :response.email}))
      toast.success('Your are successfully logged in.', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        let url = `${process.env.NEXT_PUBLIC_HOST}/`
        setTimeout(() => {
          if (router.query.next) {
            url = `${process.env.NEXT_PUBLIC_HOST}/${router.query.next}`  
          }
          router.push(url)
          window.location = url
        }, 1550);
        
    } else {
      toast.error(response.msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
  }
   

  }

  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
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
      <Head>
        <title>Login to your account</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      <div className="leading-loose">
        <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
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
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  aria-label="Email"
                  autoComplete="current-email"
                />
                
              </div>
              <div className="mt-2">
                <label
                  className="leading-7 text-sm text-gray-600 sr-only"
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  aria-label="Password"
                  autoComplete="current-password"
                />
                
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <Link href={"/forgot"}>
                      <a
                        href="#"
                        className="font-medium text-purple-600 hover:text-purple-500"
                      >
                        {" "}
                        Forgot your password?{" "}
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="text-sm">
                  <Link href={`/signup`}  >
                    <a className="font-bold text-black-600 text-md">
                      Signup
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={disable}
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
                  {!disable && 'Sign in'}
                  {disable &&  'Loading....'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
