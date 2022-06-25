import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const MyOrders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const setDate = (date) => {
    let m = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let d = new Date(date);
    let format_date = `${d.getDate()}  ${
      m[parseInt(d.getMonth())]
    } ${d.getFullYear()}`;
    return format_date;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      let url = `${process.env.NEXT_PUBLIC_HOST}/api/myorders`;
      let data = JSON.parse(localStorage.getItem("myuser")).token;
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data }),
      });
      let response = await res.json();
      setOrders(response.orders);
    };

    if (!localStorage.getItem("myuser")) {
      router.push("/login?next=orders");
    } else {
      fetchOrders();
    }
  }, [router]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Orders</title>
        <meta name="description" content="View your orders" />
        <link rel="icon" href="/ecommerce.png" />
      </Head>
      <h1 className="font-bold text-3xl py-9 text-center">My Orders</h1>
      <div className="mx-auto container">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 mx-10  max-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Order Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => (
                      <tr
                        key={item.orderId}
                        className="bg-white border-b transition duration-300 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.orderId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-5 py-4 whitespace-nowrap">
                          {setDate(item.updatedAt)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                          {item.amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="text-purple-600 hover:text-purple-500 font-semibold">
                            <Link
                              href={`/order?id=${item._id}`}
                              className="cursor-pointer "
                            >
                              Details
                            </Link>
                         </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
