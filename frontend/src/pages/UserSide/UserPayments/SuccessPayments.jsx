import React from 'react'
import Navigation from '../../../Component/Navbar/UserNav'
import { Footer } from '../../../Component/Footer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const SuccessPayments = () => {
    const navigate=useNavigate()
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          alert("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          alert(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);
  return (
    <>
      <Navigation/>
      <div className="flex  justify-center mt-20 mb-9 items-center">
        <div className="">
          <div className="bg-white shadow-md p-6 md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              />
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Have a great day!</p>
              <div className="py-10 text-center">
                <a
                  onClick={() => {
                    navigate('/mycourse')
                  }}
                  className="px-12 bg-[#051570] hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  MY COURSE{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    
    </>
  )
}

export default SuccessPayments
