import React, {useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const NavBar = ({
  logout,
  cart,
  user,
  clearCart,
  total,
  removeFromCart,
  addToCart,
}) => {
  const router = useRouter()
  const [dropdown, setDropdown] = useState(false);
  const [toogle, setToogle] = useState(false)


useEffect(() => {
  Object.keys(cart).length != 0 && setToogle(true)

    setToogle(false)

  
}, [cart])


  const toggleCart = () => {
  setToogle(!toogle)
  };

  return (
<>
  {!toogle && <span
          className="absolute right-9 top-4 z-50 cursor-pointer"
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              className="bg-white z-30  absolute right-5 top-5 px-5 border shadow-lg rounded-md w-32"
            >
              <ul>
                <li className="py-1 text-sm  font-semibold text-purple-700 hover:text-purple-500">
                  <Link href={"/myaccount"}>My Account</Link>
                </li>
                <li className="py-1 font-semibold text-sm text-purple-700 hover:text-purple-500">
                  <Link href={"/orders"}>Orders</Link>
                </li>
                <li
                  onClick={logout}
                  className="py-1 font-semibold text-sm text-purple-700 hover:text-purple-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

           
            {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-2 cursor-pointer" />
            )}
  

  </span>

 
  }        
            
    <div className={`flex justify-center items-center flex-col md:flex-row md:justify-start  py-2 shadow-xl sticky 
    top-0 bg-white z-10 ${!toogle && 'overflow-hidden'} `}>
      <div className="logo mr-auto ml-2 md:mx-5 ">
          <Image className="cursor-pointer" onClick={() => {router.push('/')}} src={'/ecommerce.png'} alt="icon" height={35} width={35} />
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <a>
              <li> Tshirts </li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li>Hoodies </li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li>Stickers </li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li>Mugs </li>
            </a>
          </Link>
        </ul>
      </div>

      <div className="cart  flex mx-5 absolute right-0 items-center top-4  cursor-pointer">
        
        {!user.value && (
          <Link href="/login" className="cur">
            <button className="bg-purple-600 text-sm text-white px-2 py-1 mx-2 rounded-md">
              Login
            </button>
          </Link>
        )}
        
        <AiOutlineShoppingCart
          className="text-xl md:text-2xl cursor-pointer"
          onClick={toggleCart}
          
        />
      </div>

      <div
        
        className={`sideCart absolute z-50  top-0  py-10 px-8 w-72 h-[100vh] 
        bg-purple-100 transition-all  ${
          toogle ? "right-0" : "-right-96"
        } overflow-auto`}
      >
        <h2 className="text-xl font-bold text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-purple-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && <div className="my-4">Your cart is empty!</div> }

          { Object.keys(cart).length != 0 && Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex  my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size.toUpperCase()}/
                    {cart[k].color.toUpperCase()})
                  </div>

                  <div className="w-1/3 ml-6 flex items-center justify-center font-semibold text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(k, 1,cart[k].size,
                          cart[k].price,
                          cart[k].color,
                          cart[k].name,
                          cart[k].img);
                      }}
                      className="cursor-pointer text-purple-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(k, 1, cart[k].size, cart[k].price, cart[k].color, cart[k].name, cart[k].img);
                      }}
                      className="cursor-pointer text-purple-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold my-3 mx-5">Total: ₹{total}</span>
        <div className="flex">
          <Link href={"/checkout"}>
            <button disabled={Object.keys(cart).length === 0} className=" disabled:bg-purple-300 flex mr-3 pt-4  text-white bg-purple-500 border-0 py-4 px-6 focus:outline-none hover:bg-purple-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" /> Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearCart}
            className=" disabled:bg-purple-300 flex mr-1 text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default NavBar;