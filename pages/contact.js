import React,{useState} from 'react';
import Head from 'next/head';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const handelChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "message") {
      setMsg(e.target.value);
    }
  };

  const sendMsg = async () => {
    const firebase_ref = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_REF
    const data = {name,email,msg}

    const res = await fetch(`${firebase_ref}/message.json`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await res.json();

    if (response.name) {
      setName('')
      setMsg('')
      setEmail('')
      toast.success('Message Successfully Sended', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setName('')
      setMsg('')
      setEmail('')
      toast.error('Unable to send the message!', {
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
    <section className="text-gray-600 min-h-screen mt-16">
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
        <title>Contact Us</title>
        <meta name="description" content="Signup" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
  
    <div className="py-10 bg-white rounded-lg p-8  shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Message</h2>
      <p className="leading-relaxed mb-5 text-gray-600">If you have anything to say or ask please share with us.</p>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" onChange={handelChange} id="name" name="name" value={name} required className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" onChange={handelChange} id="email" name="email" value={email} required className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
        <textarea id="message" onChange={handelChange} name="message" value={msg} required className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button onClick={sendMsg} className="text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">Send</button>
     
    </div>
    </div>
</section>
    )
}

export default Contact