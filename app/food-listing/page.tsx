import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import  {Navbar}  from "@/components/Navbar"

export default function FoodListingPage() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Main Container */}
      <div className="flex flex-1 p-6">
        
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 shadow-md rounded-xl p-6 hidden md:block">
          <nav className="space-y-3">
            <a href="#" className="block px-4 py-3 rounded-lg bg-emerald-500 text-white font-semibold transition hover:bg-emerald-600">
              Nearby Offers
            </a>
            <a href="#" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200">Donation History</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Find Food Rescuers</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <Input
              placeholder="Search nearby NGOs..."
              className="pl-12 w-full bg-gray-100 shadow-md border-none rounded-xl py-3"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {["Veg", "Non-Veg", "Jain"].map((type) => (
              <label key={type} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg shadow-md cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" />
                <span className="text-gray-800 font-bold">{type}</span>
              </label>
            ))}
          </div>

          {/* Food Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Sample Listing */}
            {[
              { name: "Bharat Cafe", type: "Sandwiches, Salads, Wraps", expires: "4 hours", img: "https://images.unsplash.com/photo-1565895405227-31cffbe0cf86" },
              { name: "Sahara Vegetable Mart", type: "Fruit, Vegetables, Dairy", expires: "5 hours", img: "https://images.unsplash.com/photo-1579113800032-c38bd7635818" },
              { name: "Sandeep Restaurant", type: "Indian Cuisine, Meals", expires: "3 hours", img: "https://images.unsplash.com/photo-1565895405227-31cffbe0cf86" }
            ].map((item, index) => (
              <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105">
                <div className="w-full h-48 relative">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                  <p className="text-emerald-600">{item.type}</p>
                  <p className="text-gray-600">Expires in {item.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
