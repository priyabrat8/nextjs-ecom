import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myaccount = () => {
    
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [opassword, setOpassword] = useState('')
  const [user, setUser] = useState({})
  const [udisable, setUdisable] = useState(false)
  const [pdisable, setPdisable] = useState(false)


  const handelChange = async (e) => {
    if (e.target.name == 'name') {setName(e.target.value)}
    else if (e.target.name == 'phone') {setPhone(e.target.value)}
    else if (e.target.name == 'address') {setAddress(e.target.value)}
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length === 6) {
        let pins = await fetch("/api/pincodes");
        let jsonPins = await pins.json();
  
        if (Object.keys(jsonPins).includes(e.target.value)) {
          setCity(jsonPins[e.target.value][0])
          setState(jsonPins[e.target.value][1])
         
        }
        else {
          setCity('')
          setState('')
            }
      }

      else  {
        setCity('')
        setState('')
      }
    }

    else if (e.target.name == 'city') {setCity(e.target.value)}
    else if (e.target.name == 'state') {setState(e.target.value)}
    else if (e.target.name == 'password') {setPassword(e.target.value)}
    else if (e.target.name == 'cpassword') {setCpassword(e.target.value)}
    else if (e.target.name == 'opassword') {setOpassword(e.target.value)}

  };

  const handleUserSubmit = async () => {
    setUdisable(true)
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`
    let data = {
      token: user.token,
      name,
      phone,
      address,
      city,
      state,
      pincode
    }
    let res = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
       
      },
      body: JSON.stringify(data) 
    });
    let response = await res.json()
    setUdisable(false)
    if (response.success){
    toast.success('Profile Successfully Updated', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
    else if (!response.success){
      toast.error('Unable to update account details!', {
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

    const handlePasswordSubmit = async () => {
      setPdisable(true)
      let url = `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`
      let data = {
        token: user.token,
        password,
        cpassword,
        opassword
      }
      let res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
         
        },
        body: JSON.stringify(data) 
      });
      let response = await res.json()
      setPdisable(false)
      if (response.success){
        setPassword('')
        setCpassword('')
        setOpassword('')
      toast.success('Password Successfully Updated ', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
      else if (!response.success){
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

    const fetchdata = async (token) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/getuser`
    let data = {
      token: token
    }
    let res = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
       
      },
      body: JSON.stringify(data) 
    });
    let response = await res.json()
    setName(response.name)
    setPhone(response.phone)
    setCity(response.city)
    setState(response.state)
    setPincode(response.pincode)
    setAddress(response.address)
    }

  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/login?next=myaccount");
    }
  }, [router])

  useEffect(() => {
    let myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser && myuser.email) {
      setEmail(myuser.email)
      setUser(myuser)   
      fetchdata(myuser.token)
    }
  
  }, [])

  return (
    <div className="flex">
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
        <title>My Account</title>
        <meta name="description" content="Check your account info." />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
    <div className='container mx-auto my-9' >
      <h1 className="text-3xl mb-6 text-center font-bold ">Update your Account</h1>
      <div className="flex my-2">
      <div className=" mx-auto w-1/2 py-10 bg-white rounded-lg p-8  shadow-md">
      <h2 className="text-xl font-semibold">1. Account Details</h2>
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="name"
              name="name"
              type="text"
              required
              onChange={handelChange}
              value={name}
              placeholder="Your Name"
              aria-label="Name"
            />
          </div>
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="email">
              Email (cannot be updated)
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="email"
              name="email"
              type="email"
              required
              onChange={handelChange}
              value={email}
              readOnly
              placeholder="Your Email"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="phone">
              Phone
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="phone"
              name="phone"
              type="tel"
              required
              onChange={handelChange}
              value={phone}
              placeholder="Your Phone"
              aria-label="Phone"
            />
          </div>
          <div className="mt-2">
            <label
              className="leading-7 text-sm text-gray-600"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-44"
              required
              defaultValue={address}
              onChange={handelChange}
            ></textarea>
          </div>
          <div className="mt-2">
          <label className="leading-7 text-sm text-gray-600" htmlFor="pincode">
              Pincode
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="pincode"
              name="pincode"
              type="number"
              required
              onChange={handelChange}
              value={pincode}
              placeholder="Pincode"
              aria-label="pincode"
            />
          </div>
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="state">
              State
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="state"
              name="state"
              type="text"
              required
              onChange={handelChange}
              value={state}
              placeholder="State"
              aria-label="State"
            />
          </div>
          <div className="mt-2 ">
          <label className="leading-7 text-sm text-gray-600" htmlFor="city">
              City
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="city"
              name="city"
              type="text"
              required
              onChange={handelChange}
              value={city}
              placeholder="City"
              aria-label="City"
            />
            
          </div>
          <button
              className={`flex mr-3 text-white font-semibold text-center mt-4 mb-4  bg-purple-500 hover:bg-purple-600 border-0 py-2 px-5 focus:outline-none  rounded text-sm`}
              disabled={udisable}
              onClick={handleUserSubmit}
            >
              
              {!udisable && 'Submit'}
              {udisable &&  'Updating....'}
              
              </button>
        </div>
        
      </div>
      
      <div className="flex  my-2">
      <div className=" mx-auto py-10 bg-white rounded-lg p-8 mt-6 shadow-md w-1/2">
      <h2 className="text-xl font-semibold">2.Reset Password</h2>
      <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="cpassword">
              Old Password
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="opassword"
              name="opassword"
              type="password"
              required
              onChange={handelChange}
              value={opassword}
              placeholder="Old Password"
              aria-label="password"
            />
          </div>
          
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="password">
            New Password
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="password"
              name="password"
              type="password"
              required
              onChange={handelChange}
              value={password}
              placeholder="New Password"
              aria-label="password"
            />
          </div>
          <div className="mt-2">
            <label className="leading-7 text-sm text-gray-600" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="cpassword"
              name="cpassword"
              type="password"
              required
              onChange={handelChange}
              value={cpassword}
              placeholder="Confirm Password"
              aria-label="password"
            />
          </div>
          <button
              disabled={pdisable}
              className={`flex mr-3 text-white font-semibold text-center mt-4  bg-purple-500 hover:bg-purple-600 border-0 py-2 px-5 focus:outline-none  rounded text-sm`}
              onClick={handlePasswordSubmit}
            >
              {!pdisable && 'Submit'}
              {pdisable &&  'Updating....'}
              
            </button>
      </div>
      </div>
      
    </div>
    </div>
  )
}


export default Myaccount