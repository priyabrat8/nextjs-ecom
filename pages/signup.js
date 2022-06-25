import React, {useState,useEffect} from "react";
import {useRouter} from 'next/router';
import Link from "next/link";
import Head from "next/head";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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
    if (e.target.name === 'name') {setName(e.target.value)}
    else if (e.target.name === 'phone') {
     
        setPhone(e.target.value)
      }
     
    

    else if (e.target.name === 'email') {
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
      name,
      phone,
      email,
      password
  }

  let url = `${process.env.NEXT_PUBLIC_HOST}/api/signup`

      let res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
         
        },
        body: JSON.stringify(data) 
      });
      let response = await res.json()

       

    setDisable(false)
    setName('')
    setEmail('')
    setPassword('')
    setPhone('')

    if (response.type) {
      toast.success('Your account has been created.Now you can login.', {
        position: "top-left",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast.error(response.msg, {
        position: "top-left",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
  
   

  }

  return (
    <div className="min-h-screen">
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
    <div className="flex flex-col justify-center items-center mt-3">
      <Head>
        <title>Create an account</title>
        <meta name="description" content="Signup" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      <div className="leading-loose">
        <div className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
                Signup for an account
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="mt-2">
                <label
                  className="leading-7 text-sm text-gray-600 sr-only"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  type="name"
                  required
                  placeholder="Your Name"
                  aria-label="Name"
                  autoComplete="current-name"
                />
              </div>
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
                  value={email}
                  onChange={handleChange}
                  type="email"
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
                  value={password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder="Password (at least 8 characters.)"
                  aria-label="Password"
                  
                />
                
              </div>

              <div className="mt-2">
                <label
                  className="leading-7 text-sm text-gray-600 sr-only"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  min={10}
                  type="number"
                  required
                  placeholder="Phone Number"
                  aria-label="Phone"
                  autoComplete="tel"
                />
                
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Already have an account?
                  <Link href={"/login"} className="cursor-pointer">
                    <a
                      className="no-underline  font-medium text-purple-600 hover:text-purple-500 ml-1"
                      href="../login/"
                    >
                      Log in
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                disabled={disable}
                  type="submit"
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
                  {!disable && 'Sign up'}
                  {disable &&  'Loading....'}
                </button>
              </div>
              <div className="ml-2">
                By Signup, you agree to Proshop&apos;s Terms of Use and
                <span className="text-purple-600 hover:text-purple-500">
                  <Link href={"/privacy"} className="cursor-pointer">
                    Privacy Policy
                  </Link>
                </span>
                .
              </div>

              <div className="text-grey-dark mt-2 text-center"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  };

export default Signup;
