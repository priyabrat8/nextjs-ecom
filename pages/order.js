import React,{ useEffect,useState } from 'react'
import mongoose from 'mongoose'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Order from '../models/Order'


const MyOrder = ({order,id}) => {

  const router = useRouter()
  const products = order.products
  const [orderdate, setOrderdate] = useState('')

  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
        router.push(`/login` );
      }
  }, [router])

  useEffect(() => {
    let m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let d =new Date(order.updatedAt)
    let format_date =  `${d.getDate()}  ${m[parseInt(d.getMonth())]} ${d.getFullYear()}`  
    setOrderdate(format_date)
  }, [orderdate,order])

  

  return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <Head>
        <title>Order</title>
        <meta name="description" content="See your orders" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #{order.orderId}</h1>
                <p className="text-base font-medium leading-6 text-gray-600">{orderdate}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    { Object.keys(products).map((item) => (          
                        <div key={item} className="mt-4 mb-2 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full " src={products[item].img} alt="dress" />
                               
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{products[item].name}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                       <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-500">Size: </span> {products[item].size}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-500">Color: </span> {products[item].color}
                                        </p>
                                { order.deliveryStatus == 'Delivered' && <p className="text-sm leading-none mt-2 font-semibold py-2 text-gray-800">
                                        <span className="text-purple-600"><Link href={`/product/${item}#reviews`}>Give your feedback</Link></span>
                                        </p> }
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{products[item].qty}</p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800"> ₹{products[item].price * products[item].qty}</p>
                                </div>
                            </div>
                        </div>
                        ))  }
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 space-y-6   ">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">₹{order.amount}</p>
                            </div>
                            </div>
                

                        
                      </div>
                      <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Name</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.name}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Email</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.email}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Address</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.address},{order.city},<span className='mt-1 block'>{order.state}-{order.pincode}</span></p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Phone</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.phone}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Delivery Status</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.deliveryStatus}</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Payment Status</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{order.status}</p>
                            </div>
                            
                        </div>
                    
                    </div>
                    
                </div>
               
            </div>
        </div>

    
 
    
  )  
  
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOOSE_URL);
  }

  let order = await Order.findById(context.query.id );
 
  return {
    props: { order: JSON.parse(JSON.stringify(order)), id:context.query.id }
  };
}

export default MyOrder