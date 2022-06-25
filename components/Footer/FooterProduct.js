import React from 'react'
import ProductLink from './ProductLink'

const FooterProduct = ({category}) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">{category}</h2>
        <nav className="list-none mb-10">
          {category == 'Products'  && 
          <>
        <ProductLink link={'/tshirts'} product_name = {'Tshirts'}  />
        <ProductLink link={'/hoodies'} product_name = {'Hoodies'}  />
        <ProductLink link={'/mugs'} product_name = {'Mugs'}  />
        <ProductLink link={'/stickers'} product_name = {'Stickers'}  />
        </>
        }

        { category == 'Coustomer Service' && <>
        <ProductLink link={'/about'} product_name = {'About Us'}  />
        <ProductLink link={'/contact'} product_name = {'Contact Us'}  />
        
        </> }

        
        { category == 'Policy' && <>
        <ProductLink link={'/privacy'} product_name = {'Privacy Poilcy'}  />
        <ProductLink link={'/privacy'} product_name = {'Terms and Conditions'}  />
        
        </> }

        </nav>
      </div>
  )
}

export default FooterProduct