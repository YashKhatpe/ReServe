"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export function Navbar() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const [userType, setUserType] = useState<"donor" | "ngo" | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("here");
      console.log(user);
      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      const { data: donorData, error: donorError } = await supabase
        .from("donor")
        .select("id")
        .eq("id", user.id)
        .single();

      if (donorError) {
        console.error("Error fetching donor data:", donorError);
      }

      setUserType(donorData ? "donor" : "ngo");
      console.log(donorData);
    }

    checkAuth();
  }, [router]);

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
            {userType === "donor" ? (

                <Link href="/donate">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Donate</Button>
              </Link>
            ) : (
                <Link href="/food-listing">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Request Food</Button>
              </Link>

            )}
            
            
            {!userId ? (
              <Link href="/register">
              <Button variant="outline" className="bg-stone-100 hover:bg-stone-200 cursor-pointer">Sign up</Button>
              </Link>

            ) : (
              
              <Link href="/sign-out">
              <Button variant="outline" className="bg-stone-100 hover:bg-stone-200 cursor-pointer">Sign Out</Button>
              </Link>
            )
            }
            
            
          </div>
        </div>
      </header>
)}