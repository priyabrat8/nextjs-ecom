import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import FooterProduct from './FooterProduct'
import SocialMedia from './SocialMedia'

const Footer = () => {
  
  return (
    <div className='bg-white'>
        <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <Link href={"/"}>
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <Image src="/ecommerce.png" alt="icon" height={48} width={48} />
        <span className="ml-3 text-xl">ProShop</span>
      </a>
      </Link>
      
      <p className="mt-2 text-sm text-gray-500">Worlds Best Place To Shop With Quick Delevery And Lowest Price.</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <FooterProduct category={'Products'}  />
      <FooterProduct category={'Coustomer Service'}  />
      <FooterProduct category={'Policy'}  />
     
    </div>
  </div>
 <SocialMedia/>
</footer>
    </div>
  )
}

export default Footer