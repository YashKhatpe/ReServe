import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
<header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Heart className="h-5 w-5" /> */}
            <Image
              src="/navlogo.png"
              alt="Food donation"
              width={50}
              height={50}
              className=""
              priority
            />
            <span className="font-bold text-lg">ReServe</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium">How it works</a>
            <a href="#impact" className="text-sm font-medium">Impact</a>
            <a href="#benefits" className="text-sm font-medium">Benefits</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Donate</Button>
            <Button variant="outline" className="bg-stone-100 hover:bg-stone-200 cursor-pointer">Sign up</Button>
          </div>
        </div>
      </header>
)}