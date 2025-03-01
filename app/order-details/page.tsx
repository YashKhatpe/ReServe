"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import Link from "next/link";
    
export default function OrderDetailsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <div className="h-6 w-6 bg-black text-white flex items-center justify-center rounded">
              <span className="transform rotate-45">◆</span>
            </div>
            <span>Food Donation</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-8">Order details</h1>
        
        {/* OTP Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">OTP</h2>
          <Button 
            variant="outline" 
            className="w-full bg-stone-50 hover:bg-stone-100 py-6 text-base font-normal justify-center"
          >
            View OTP
          </Button>
        </section>
        
        {/* Estimated Pickup */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Estimated pickup</h2>
          <p className="text-gray-800">Today, 5:00 PM</p>
        </section>
        
        {/* Restaurant Address */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Restaurant address</h2>
          <p className="text-gray-800">1234 Main St, San Francisco, CA 94105</p>
        </section>
        
        {/* Order Details */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Order details</h2>
          
          <div className="space-y-6">
            {/* Item 1 */}
            <div>
              <p className="font-semibold text-gray-800">Burrito Bowl (Chicken)</p>
              <p className="text-amber-700">1x Burrito Bowl (Chicken)</p>
            </div>
            
            {/* Item 2 */}
            <div>
              <p className="font-semibold text-gray-800">Grapefruit Soda</p>
              <p className="text-amber-700">1x Grapefruit Soda</p>
            </div>
            
            {/* Item 3 */}
            <div>
              <p className="font-semibold text-gray-800">Burrito Bowl (Vegan)</p>
              <p className="text-amber-700">1x Burrito Bowl (Vegan)</p>
            </div>
            
            {/* Item 4 */}
            <div>
              <p className="font-semibold text-gray-800">Burrito Bowl (Steak)</p>
              <p className="text-amber-700">1x Burrito Bowl (Steak)</p>
            </div>
          </div>
        </section>
        
        {/* Cancel Button */}
        <Button 
          variant="outline" 
          className="w-full border-gray-300 hover:bg-gray-100 py-6 text-base font-normal justify-center"
        >
          Cancel order
        </Button>
      </main>
    </div>
  );
}