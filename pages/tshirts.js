import React from "react";
import Head from "next/head";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Shop A Tshirt For You</title>
        <meta name="description" content="Best place to shop tshirts" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p className="p-14 shadow-xl text-center text-red-600 font-bold">Sorry, Tshirts are currently out of stock.</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-xl cursor-pointer m-5">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto h-[30vh] md:h-[36vh] block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Tshirts
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.map((s) => (
                          <span key={s} className="border border-gray-300 mx-1 px-1">{s}</span>
                           ))}
                      </div>
                      <div className="mt-1">
                        {products[item].color.map((c) =>
                      
                          (
                          <button key={c}  className={`border-2 border-gray-300 ml-1 ${c.toLowerCase()} rounded-full w-6 h-6 focus:outline-none`}></button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOOSE_URL);
  }

  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availabeQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }

      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availabeQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availabeQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;
