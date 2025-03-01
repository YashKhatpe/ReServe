"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
import {
  ShoppingBag,
  Truck,
  Users,
  DollarSign,
  Heart,
  Utensils,
  Banknote,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("here");
      console.log(user);
      if (!user) {
        // router.push("/login");
        return;
      }

      setUserId(user.id);
    }

    checkAuth();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navigation */}
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
            <a
              href="#how-it-works"
              className="text-sm font-medium"
              >
              How it works
            </a>
            <a href="#impact" className="text-sm font-medium">
              Impact
            </a>
            <a href="#benefits" className="text-sm font-medium">
              Benefits
            </a>
          </nav>
          <div className="flex items-center gap-2">
            
              <Link href="/donate">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Donate</Button>
              </Link>
            
            
            {!userId ? (
              
              <Link href="/register">
              <Button variant="outline" className="bg-stone-100 hover:bg-stone-200 cursor-pointer">Sign up</Button>
              </Link>
              ): (
                <Link href="/sign-out">
              <Button variant="outline" className="bg-stone-100 hover:bg-stone-200 cursor-pointer">Log Out</Button>
              </Link>
              )
            }
            
            
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="relative rounded-lg overflow-hidden bg-stone-200 mb-8">
            <div className="absolute inset-0 z-0">
              <Image
                src="/hero.png"
                alt="Food donation"
                fill
                className="object-cover opacity-80"
                priority
              />
            </div>
            <div className="flex items-center justify-center h-[350px] text-center">
              <div className="relative z-10 p-8 md:p-16 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 whitespace-nowrap">
                  Nourish Every Need
                </h1>

                <p className="text-lg mb-8">
                  Every Meal Saved, Every Life Nourished
                </p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                    Donate
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 cursor-pointer"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <h2
            className="text-3xl font-bold mb-4 text-center pt-4"
            id="how-it-works"
          >
            How It Works
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 "
            id="how-it-works"
          >
            <Card className="p-6 flex flex-col items-center text-center">
              <ShoppingBag className="h-8 w-8 mb-4" />
              <h3 className="font-medium">Choose how much to donate</h3>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <Truck className="h-8 w-8 mb-4" />
              <h3 className="font-medium">A driver picks up your food</h3>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="font-medium">We deliver to those in need</h3>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <DollarSign className="h-8 w-8 mb-4" />
              <h3 className="font-medium">Get a tax deduction</h3>
            </Card>
          </div>

          {/* Stats */}
          <h2 className="text-3xl font-bold mb-4 text-center pt-4" id="impact">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            <Card className="p-6 bg-stone-100">
              <div className="text-sm text-gray-600 mb-1">
                Pounds of food donated
              </div>
              <div className="text-3xl font-bold mb-1">5,000</div>
              <div className="text-sm text-emerald-600">+20%</div>
            </Card>
            <Card className="p-6 bg-stone-100">
              <div className="text-sm text-gray-600 mb-1">Meals donated</div>
              <div className="text-3xl font-bold mb-1">2,000</div>
              <div className="text-sm text-emerald-600">+10%</div>
            </Card>
            <Card className="p-6 bg-stone-100">
              <div className="text-sm text-gray-600 mb-1">Total donations</div>
              <div className="text-3xl font-bold mb-1">$10,000</div>
              <div className="text-sm text-emerald-600">+15%</div>
            </Card>
            <Card className="p-6 bg-stone-100">
              <div className="text-sm text-gray-600 mb-1">
                Pounds of food donated
              </div>
              <div className="text-3xl font-bold mb-1">1,000</div>
              <div className="text-sm text-emerald-600">+5%</div>
            </Card>
          </div>

          {/* Benefits Section */}
          <section id="benefits" className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Benefits</h2>
            <p className="text-lg mb-8">
              Donating your food is a simple way to support your community. Your
              donations help feed families and individuals in need. You can also
              deduct 100% of the value of your food donation from your taxable
              income. And we make it easy for you to donate your food. Just a
              few clicks and we take care of the rest.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="overflow-hidden">
                <div className="h-48 bg-stone-200 relative">
                  <Image
                    src="https://cdn.usegalileo.ai/sdxl10/b547c90c-b042-41e9-aec4-e418d020d0ad.png"
                    alt="Support your community"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Support your community</h3>
                  <p className="text-sm text-gray-600">
                    Your donations help feed families and individuals in need.
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-48 bg-stone-200 relative">
                  <Image
                    src="https://cdn.usegalileo.ai/sdxl10/6227c9d6-840a-4453-a8f1-bd0f6077458c.png"
                    alt="Reduce food waste"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Reduce food waste</h3>
                  <p className="text-sm text-gray-600">
                    The average American family throws away $1,600 worth of food
                    each year. Your donations help reduce this waste.
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-48 bg-stone-200 relative">
                  <Image
                    src="https://cdn.usegalileo.ai/sdxl10/445e7095-0276-4b04-aedf-ddc04de3df88.png"
                    alt="Tax deductible"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Tax deductible</h3>
                  <p className="text-sm text-gray-600">
                    You can deduct 100% of the value of your food donation from
                    your taxable income.
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-48 bg-stone-200 relative">
                  <Image
                    src="https://cdn.usegalileo.ai/sdxl10/2b2e9a3f-7980-4a36-96be-9002b6f6215e.png"
                    alt="Simple and efficient"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Simple and efficient</h3>
                  <p className="text-sm text-gray-600">
                    We make it easy for you to donate your food. Just a few
                    clicks and we take care of the rest.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Testimonials */}
          {/* <section id="testimonials" className="mb-16">
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-rose-200 rounded-lg mb-2 mx-auto relative overflow-hidden">
                  <Heart className="absolute inset-0 m-auto text-rose-500 h-12 w-12" />
                </div>
                <div>Lauren S</div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-rose-200 rounded-lg mb-2 mx-auto relative overflow-hidden">
                  <Heart className="absolute inset-0 m-auto text-rose-500 h-12 w-12" />
                </div>
                <div>David M</div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-rose-200 rounded-lg mb-2 mx-auto relative overflow-hidden">
                  <Heart className="absolute inset-0 m-auto text-rose-500 h-12 w-12" />
                </div>
                <div>Sarah T</div>
              </div>
            </div>
          </section> */}

          {/* CTA */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">
              Ready to donate your food?
            </h2>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
              Donate
            </Button>
          </section>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            © 2025 ReServe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
