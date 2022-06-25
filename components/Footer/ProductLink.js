import React from 'react'
import Link from 'next/link'

const ProductLink = ({link,product_name}) => {
  return (
    <li>
    <Link href={link}> 
    <a className="text-gray-600 hover:text-gray-800 cursor-pointer">{product_name}</a>
    </Link>
  </li>
  )
}

export default ProductLink