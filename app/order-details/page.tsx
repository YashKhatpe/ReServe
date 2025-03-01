"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailsPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white">
        
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 py-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Details</h1>
          
          {/* OTP Section */}
          <section className="mb-8 bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">OTP</h2>
            <Button 
              variant="outline" 
              className="w-full bg-white border-gray-300 hover:bg-gray-100 py-5 text-lg font-medium cursor-pointer"
            >
              View OTP
            </Button>
          </section>

          {/* Estimated Pickup */}
          <section className="mb-8 bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Estimated Pickup</h2>
            <p className="text-gray-700">Today, 5:00 PM</p>
          </section>

          {/* Restaurant Address */}
          <section className="mb-8 bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Restaurant Address</h2>
            <p className="text-gray-700 font-bold">Bharat Cafe</p> 
            <p className="text-gray-700">M.G. Road, Ghatkopar West, 400086, Mumbai</p>
          </section>

          {/* Order Details */}
          <section className="mb-12 bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>

            <div className="space-y-4">
              {[
                { name: "Paneer Sandwich", qty: "5x" },
                { name: "Grapefruit Soda", qty: "1x" },
                { name: "Burrito Bowl (Vegan)", qty: "1x" },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-amber-700">{item.qty}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-6"/>

          {/* Cancel Button */}
          <Button 
            variant="outline" 
            className="w-full border-gray-300 hover:bg-gray-100 py-5 text-lg font-medium cursor-pointer"
          >
            Cancel Order
          </Button>
        </main>
      </div>
    </>
  );
}
