import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Pincode from "../../components/Pincode";
import Product from "../../models/Product";
import mongoose from "mongoose";
import {AiOutlinePlus} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slug = ({ addToCart, product, variants, buyNow, error }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [comments, setComments] = useState([])
  const [review, setReview] = useState({})
  const [comment, setComment] = useState('')
  const [star, setStar] = useState(0)
  const [rrating, setRrating] = useState(0)
  const [disable, setDisable] = useState(false)
  const [rcard, setrcard] = useState(false)
  const [isUpdate, setisUpdate ] = useState(false)
  


  const handelChange = async (e) => {
    if (e.target.name == "comment") {
      setComment(e.target.value);
    }
  };

  const allReviews = useCallback( async () => {
      let url = `${process.env.NEXT_PUBLIC_HOST}/api/getreviews`
    let data = {
      name: product.slug
    }

    let res = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
       
      },
      body: JSON.stringify(data) 
    });
    let response = await res.json()   
    setComments(response.reviews)  
    setReview(response.reviewObj) 
    if (!(review.rating / review.numrating)) {
      setRrating(0)
    }
    else if(review.rating / review.numrating) {
      setRrating(review.rating / review.numrating)
    }
    },
    [product,review],
  )
  
  
   
    
  

  const addReview = async () => {
    let myuser = JSON.parse(localStorage.getItem('myuser'))
    let data = { star,comment,name: product.slug,token: myuser.token, update: isUpdate};
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/addreview`;
    setDisable(true)

    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    setDisable(false)

    if (response.success) {
      allReviews()
      setStar(0)
      setComment('')
      setrcard(false)
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
    else if (!response.success) {
      setStar(0)
      setComment('')
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

  const add = async () => {
    // Chek if already have comment on this product
      let myuser = JSON.parse(localStorage.getItem('myuser'))
      if (!rcard) {
        // Check if logged in
      if (!myuser) {
        toast.error('You are not logged in!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

    // Check if already give a comment
    for (comment of comments) {
    if (comment.email == myuser.email) {
      // Show edit card 
      setStar(comment.rating)
      setComment(comment.comment)
      setisUpdate(true)
      setrcard(true)

    }
    }

    // Check if user bought the product
    let url = `${process.env.NEXT_PUBLIC_HOST}/api/checkproductorder`
    let data = {
    email: myuser.email,
    name: product.slug
    }
    let res = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(data) 
    });
    let response = await res.json()

    if (response.success) {

    setrcard(true)
    }
    else if (!response.success) {
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

    else {
      setrcard(false)
      setStar(0)
      setComment('')
    }
  }


  

  useEffect(() => {
    if (!error) {
      setSize(product.size);
      setColor(product.color);
      allReviews()
    }


  }, [router.query, error, product,allReviews]);

  const refreshVariants = (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    router.push(url);
  };

  return (
    <>
      {error && (
        <div className="min-h-screen mt-40">
          <Head>
            <title>404 | Page not found</title>
            <meta name="description" content="Cant find the page" />
            <link rel="icon" href="/ecommerce.png" />
          </Head>
          <h1 className="font-bold text-center text-8xl">404</h1>
          <p className="text-center font-semibold ">
            The page could not be found!
          </p>
        </div>
      )}
      {!error && size && color && (
        <>
        <section className="text-gray-600 body-font overflow-hidden">
          <ToastContainer
            position="bottom-center"
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
            <title>Product Details</title>
            <meta name="description" content="Saw your Product Details" />
            <link rel="icon" href="/ecommerce.png" />
          </Head>
          <div className="flex">
            <div className="container px-5 py-14 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                  src={`${product.img}`}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    PROSHOP
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {product.title} ({product.size.toUpperCase()}/
                    {product.color.toUpperCase()})
                  </h1>
                  <div className="flex">

                  <span className="flex items-center">
    <svg className={`w-5 h-5 ${Math.round(rrating) >= 1 ? 'text-yellow-400' : 'text-gray-300'}`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${Math.round(rrating) >= 2 ? 'text-yellow-400' : 'text-gray-300'}`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${Math.round(rrating) >= 3 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${Math.round(rrating) >= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${Math.round(rrating) >= 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <span className="text-gray-600 ml-3">{!(review.rating / review.numrating) ? 0 : review.rating / review.numrating } out of 5</span>
                  </span>

                    <span className="flex ml-3 pl-3 py-2 border-l-2 space-x-1 text-purple-600 font-semibold cursor-pointer border-gray-200 space-x-2s">
                      <a href="#reviews" className="no-underline transition-all">
                      See all reviews
                      </a>
                    </span>
                  </div>
                  <span className="flex  mb-3  text-black font-semibold cursor-pointer border-gray-200 ">
                  {review.numrating} global ratings
                    </span>
                  <p className="leading-relaxed">
                    {product.desc}
                  </p>
                  <div className="flex mt-4  items-center pb-5 border-b-2 border-gray-200 mb-5 space-x-11">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      {Object.keys(variants).map((c) => {
                        if (Object.keys(variants[c]).includes(size)) {
                          return (
                            <button
                              key={c}
                              onClick={() => refreshVariants(c, size)}
                              className={`border-2 ml-1 ${c.toLowerCase()} rounded-full w-6 h-6 focus:outline-none ${
                                color === c ? "border-black" : "border-gray-300"
                              } `}
                            ></button>
                          );
                        }
                      })}
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select
                          value={size}
                          onChange={(e) =>
                            refreshVariants(color, e.target.value)
                          }
                          className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10"
                        >
                          {Object.keys(variants[color]).map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ₹{product.price}
                    </span>
                    
                    {product.availabeQty !== 0 &&  <> <button
                      disabled={product.availabeQty <= 0}
                      onClick={() => {
                        buyNow(
                          slug,
                          1,
                          product.size,
                          product.price,
                          product.color,
                          product.title,
                          product.img
                        );
                      }}
                      className="flex disabled:bg-purple-300 ml-4 text-white bg-purple-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-purple-600 rounded "
                    >
                      Buy Now
                    </button>
                    <button
                      disabled={product.availabeQty <= 0}
                      onClick={() => {
                        toast.success("Item added to your cart", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });

                        addToCart(
                          slug,
                          1,
                          product.size,
                          product.price,
                          product.color,
                          product.title,
                          product.img
                        );
                      }}
                      className="disabled:bg-purple-300 flex ml-4 text-white bg-purple-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-purple-600 rounded "
                    >
                      Add to Cart
                    </button> </>}
                    {product.availabeQty <= 0 && (
                    <div className="m-1 ml-4 font-semibold text-lg text-red-600">
                      This product is currently out of stock.
                    </div>
                  )}
                    
                  </div>
                  <Pincode disable={product.availabeQty === 0} />
                  
                </div>
              </div>
            </div>
          </div>
        </section>

<div id="reviews" className="transition-opacity">
  <div className="flex justify-between">
  <h3 className="font-semibold text-3xl ml-9 mb-6 inline-block text-black">Reviews</h3>
  <button onClick={add} className="mb-3 disabled:bg-purple-300  ml-4 text-white bg-purple-500 border-0  px-2 md:px-6 focus:outline-none hover:bg-purple-600 rounded mr-5">
    <AiOutlinePlus className="inline-block mr-1 text-xl mb-1 font-bold" />
    Add Review 
  </button>
  </div>
{rcard &&  <div className="flex flex-col justify-center items-center mb-3">
  <div className="py-10 bg-white rounded-lg p-8  shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Rate the product</h2>
      <div className="flex items-center">
    <svg onClick={() => {setStar(1)}} name="1" className={`w-10 h-10 ${star >= 1 ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg onClick={() => {setStar(2)}} name="2" className={`w-10 h-10 ${star >= 2 ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg onClick={() => {setStar(3)}} name="3" className={`w-10 h-10 ${star >= 3 ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg onClick={() => {setStar(4)}} name="4" className={`w-10 h-10 ${star >= 4 ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg onClick={() => {setStar(5)}} name="5" className={`w-10 h-10 ${star >= 5 ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

</div>
      <div className="relative mb-4">
        <label htmlFor="comment" className="leading-7 text-sm text-gray-600">Comment</label>
        <textarea id="comment" onChange={handelChange} name="comment" value={comment} required className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
  <button 
  onClick={addReview} 
  disabled={disable} 
  className="text-white disabled:bg-purple-300 bg-purple-500 border-0 py-2 px-5 focus:outline-none hover:bg-purple-600 rounded text-lg"
  >
    
    {!disable && 'Submit'}
    {disable &&  'Loading....'}
    </button>
     
    </div>
  </div>}
  {comments.map((e) => {
    return (
      <div key={e.email} className="flex items-center pt-5 mx-8 bg-white mb-10 rounded-lg overflow-auto">  
  <div className="ml-6">
    <p className="flex items-baseline">
      <span className="text-gray-600 font-bold">{e.name}</span>
      <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
    </p>
    
    <div className="flex items-center mt-1">
    <svg className={`w-5 h-5 ${e.rating >= 1 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${e.rating >= 2 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${e.rating >= 3 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${e.rating >= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg className={`w-5 h-5 ${e.rating >= 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    </div> 
    <div className="mt-3 pb-5">
      <p className="mt-1">{e.comment}</p>
    </div>
  </div>
  </div>
    )
  } )}

</div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOOSE_URL);
  }

  let error = null;
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Slug;
