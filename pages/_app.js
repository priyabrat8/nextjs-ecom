import '../styles/globals.css'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar'
import { useState,useEffect } from 'react'
import {useRouter} from 'next/router'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(5)
  const [progress, setProgress] = useState(0)

  const router = useRouter()

  useEffect(() => {
    
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })


    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      localStorage.clear()
    }

    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      setUser({value: myuser.token , email: myuser.email})   
    }
    setKey(Math.random())
    
  }, [])
  
  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({value:null})
    setKey(Math.random())
    router.push('/')
  }

  const saveCart = (myCart) => {
    let subt = 0
    localStorage.setItem("cart", JSON.stringify(myCart))
    setCart(myCart)
    let keys = Object.keys(myCart)
    if (myCart) {
      for (let i = 0 ; i < keys.length;i++) {
          subt += myCart[keys[i]].price * myCart[keys[i]].qty
            }
    }
    
    setTotal(subt)
  }

  const addToCart = (itemCode,qty,size,price,color,name,img) => {
    if (Object.keys(cart).length == 0) {
      setKey(Math.random())
    }
    let newCart = cart


    if (itemCode in cart ){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = {qty,size,price,color,name,img }
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode,qty,size,price,color,name,img) => {
    let newCart = {}
    newCart[itemCode] = {qty,size,price,color,name,img}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode,qty,size,price,color,name,img) => {
    let newCart = cart
    if (itemCode in cart ){
      newCart[itemCode].qty = cart[itemCode].qty - qty

      if (newCart[itemCode]["qty"] <= 0) {
        delete newCart[itemCode]
      }
    }
    setCart(newCart)
    saveCart(newCart)

  }

  

  return (
  <>
        <LoadingBar
        color='#9333EA'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />

  
    {key && <NavBar logout={logout}  user={user} buyNow={buyNow} cart={cart} clearCart={clearCart} saveCart={saveCart} removeFromCart={removeFromCart} addToCart={addToCart} total={total} />}
    <Component cart={cart} buyNow={buyNow}  clearCart={clearCart} saveCart={saveCart} removeFromCart={removeFromCart} addToCart={addToCart} total={total} {...pageProps} />
    <Footer />
  </>
  )
}

export default MyApp
