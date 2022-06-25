import React from 'react'
import Head from 'next/head'

const About = () => {
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <Head>
        <title>About Us</title>
        <meta name="description" content="About us" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
  <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
    <img className="lg:w-1/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="/ecommerce.png" />
    <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to CodesWear.com</h1>
      <p className="mb-8 leading-relaxed">This website is an attempt to deliver amazing products at a good and reasonable price.Codeswear.com is an attempt to serve the people of india with unique designs on apparels. E-commerce is revolutionizing the way we all shop in India. Why do you want to hope from one store to another in search of your favorite geek hoodie when you can find it on the Internet in a single click? Not only hoodies, we also have a wide variety of stickers, mugs and other apparels. This website is powerd by NextJs + NodeJs + MongoDB and Firebase for storing the data.
      </p>
    </div>
  </div>
</section>
  )
}

export default About