import React,{useState} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart ,total, removeFromCart, addToCart,clearCart }) => {
  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')


  // on field change
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

    // setTimeout(() => {
    //   if (!name && !address && !pincode && !city && !state && !phone) {
    //     setDisabled(false)
    //   }
    //   else {
    //     setDisabled(true)
    //   }   
    // }, 100);
   
  };

  // place order
  const setOrder = async () => {
    if (name.length !== 0 && state.length !== 0 && city.length !== 0 && address.length !== 0) {
      let orderId = Math.floor(Math.random() * Date.now())
      let data = {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        cart,
        total,
        orderId
      }
      
  
      let url = `${process.env.NEXT_PUBLIC_HOST}/api/order`
  
      let res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
         
        },
        body: JSON.stringify(data) 
      });
      let response = await res.json()
      if (response.scusses) {
        clearCart()
        setName('')
        setPhone('')
        setAddress('')
        setState('')
        setCity('')
        setPincode('')
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
        if (response.clear) {
          clearCart()
        }
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
    }else {
      toast.error('Some fields are empty!', {
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

  // fetch user  data from 
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
      router.push("/login?next=checkout");
    }
  }, [router]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('myuser'))
    if (user && user.email) {
      setEmail(user.email)
      fetchdata(user.token)   
    }
  
  }, [])
  

  

  return (
    <div className='container mx-auto my-9' >
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
        <title>Checkout</title>
        <meta name="description" content="Empty your cart now." />
        
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      
      <h1 className="text-3xl text-center font-bold ">Checkout</h1>
      <div className="flex my-2">
      <div className=" mx-auto md:w-1/2 py-10 bg-white rounded-lg p-8  shadow-md">
      <h2 className="text-xl font-semibold">1. Delivery Details</h2>

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
              Email
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
          <div className="mt-2">
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
        </div>
      </div>

        <div className="max-w-xl mx-auto mt-10 py-10 bg-white rounded-lg p-8  shadow-md ">
          <p className="text-xl font-semibold">2. Review Cart Items</p>
          <div className="sideCart mt-2 py-5 px-16  ">
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length == 0 && (
                <div className="my-4 text-center text-red-500">Your cart is empty!</div>
              )}

              {Object.keys(cart).map((k) => {
                return (
                  <div key={k} > 
                  <li  >
                    <div className="item flex space-between space-x-10  my-5">
                      <div className="w-2/3 font-semibold">
                        {cart[k].name}({cart[k].size.toUpperCase()}/
                        {cart[k].color.toUpperCase()})
                      </div>
                      <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                        <AiFillMinusCircle
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].size,
                              cart[k].price,
                              cart[k].color,
                              cart[k].name,
                              cart[k].img
                            );
                          }}
                          className="cursor-pointer text-purple-500"
                        />
                        <span className="mx-3 text-sm">{cart[k].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].size,
                              cart[k].price,
                              cart[k].color,
                              cart[k].name,
                              cart[k].img
                            );
                          }}
                          className="cursor-pointer text-purple-500"
                        />
                      </div>
                    </div>
                  </li>
                  </div>
                );
              })}
            </ol>
            {/* <span className="font-bold ml-64">Total: ₹{total}</span> */}
          </div>
          <div className=" mt-1">
            <button
              className={`flex mr-3 text-white font-semibold disabled:bg-purple-300 bg-purple-500 hover:bg-purple-600 border-0 py-2 px-5 focus:outline-none  rounded text-sm`}
              onClick = { setOrder}
            >
              Pay ₹{total}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Checkout;
