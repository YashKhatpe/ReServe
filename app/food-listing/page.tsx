import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';

export default function FoodListingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-lg flex items-center gap-2">
              <Menu className="h-5 w-5" />
              <span>Food for Good</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium">Dashboard</a>
              <a href="#" className="text-sm font-medium">Explore</a>
              <a href="#" className="text-sm font-medium">Listings</a>
              <a href="#" className="text-sm font-medium">Resources</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search" 
                className="pl-10 w-64 bg-stone-100 border-none"
              />
            </div>
            <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">Log in</Button>
            <Button variant="outline" className="bg-stone-100 hover:bg-stone-200">Sign up</Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r p-4 hidden md:block">
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded-md bg-stone-100 font-medium">Nearby offers</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-stone-50">My offers</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-stone-50">Donation history</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-stone-50">Settings</a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Nearby offers</h1>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search for offers..." 
              className="pl-10 w-full bg-stone-50 border-stone-200"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">All</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Bakery</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Grocery</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Restaurant</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Farm</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Catering</Button>
            <Button variant="outline" className="bg-stone-50 hover:bg-stone-100 rounded-full">Other</Button>
          </div>

          {/* Food listings */}
          <div className="space-y-6">
            {/* Listing 1 */}
            <div className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden">
              <div className="w-full md:w-64 h-48 md:h-auto bg-stone-200 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Pret A Manger" 
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold mb-1">Pret A Manger</h2>
                <p className="text-amber-700 mb-1">Sandwiches, Salads, Wraps</p>
                <p className="text-gray-600">Expires in 4 hours</p>
              </div>
            </div>

            {/* Listing 2 */}
            <div className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden">
              <div className="w-full md:w-64 h-48 md:h-auto bg-stone-200 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Whole Foods Market" 
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold mb-1">Whole Foods Market</h2>
                <p className="text-amber-700 mb-1">Fruit, Vegetables, Dairy</p>
                <p className="text-gray-600">Expires in 5 hours</p>
              </div>
            </div>

            {/* Listing 3 */}
            <div className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden">
              <div className="w-full md:w-64 h-48 md:h-auto bg-stone-200 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Pret A Manger" 
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold mb-1">Pret A Manger</h2>
                <p className="text-amber-700 mb-1">Sandwiches, Salads, Wraps</p>
                <p className="text-gray-600">Expires in 4 hours</p>
              </div>
            </div>

            {/* Listing 4 */}
            <div className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden">
              <div className="w-full md:w-64 h-48 md:h-auto bg-stone-200 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Whole Foods Market" 
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold mb-1">Whole Foods Market</h2>
                <p className="text-amber-700 mb-1">Fruit, Vegetables, Dairy</p>
                <p className="text-gray-600">Expires in 5 hours</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}