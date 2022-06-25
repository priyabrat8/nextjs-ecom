import React, { useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pincode = ({disable}) => {
  const [pin, setPin] = useState();

  const checkPincodeAvailability = async () => {
    let pins = await fetch("/api/pincodes");
    let jsonPins = await pins.json();
    if (Object.keys(jsonPins).includes(pin)) {
      toast.success('Your pincode is serviceable!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast.error('Sorry, Your pincode is not serviceable!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  return (

      <div className="pin mt-4 flex space-x-2 ">
        <input
          type="text"
          name="pincode"
          onChange={onChangePin}
          id="pincode"
          placeholder="Enter your pincode"
          className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <button
          disabled = {disable}
          onClick={checkPincodeAvailability}
          className=" disabled:bg-purple-300 flex ml-14 text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
        >
          Check
        </button>
      </div>

  );
};

export default Pincode;
