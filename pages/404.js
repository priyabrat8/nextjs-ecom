import React from 'react'
import Head from 'next/head'

const Error = () => {
  return (
    <div className='min-h-screen mt-40'>
        <Head>
        <title>404 | Page not found</title>
        <meta name="description" content="Cant find the page" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      <h1 className='font-bold text-center text-8xl'>404</h1>
      <p className='text-center font-semibold '>The  page could not be found!</p>
      </div> 
  )
}

export default Error