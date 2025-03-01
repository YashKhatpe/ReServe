"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Phone, Globe, BatteryWarning, MessageCircleWarning, LucideMessageSquareWarning } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {

    const searchParams = useSearchParams();

  const foodName = searchParams.get("food_name");
  const foodImage = searchParams.get("food_image");
  const foodType = searchParams.get("food_type");
  const expiryDate = searchParams.get("expiry_date_time");
  const preparationDate = searchParams.get("preparation_date_time");
  const addressMapLink = searchParams.get("address_map_link");
    const serves = searchParams.get("serves");
   
    const preferredPickupTime = searchParams.get("preferred_pickup_time");
    

  const query = Object.fromEntries(searchParams.entries());

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2 mb-6">
          <Button variant="ghost" onClick={() => window.history.back()}>
            Back
          </Button>
          <h1 className="text-3xl font-bold">{decodeURIComponent( foodName || "")}</h1>
        </div>

        {/* Main Content Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="rounded-lg overflow-hidden w-full h-full relative">
           
                                {/* <Image src={donation.food_image} alt={donation.food_name} fill className="object-cover"/> */}
                            
            <Image
              src={decodeURIComponent(foodImage || "")}
              alt={foodName || "Food Image"}
              fill
              className="object-cover"
              
            />
          </div>

          {/* Right Side - Details */}
          <Card className="w-full">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Details</h2>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">Mumbai</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Prefferred Pickup Time</p>
                    <p className="text-sm text-muted-foreground">{decodeURIComponent( preferredPickupTime || "")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BatteryWarning className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Expiry Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(decodeURIComponent(expiryDate || "Today")).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Serves</p>
                    <p className="text-sm text-muted-foreground">{decodeURIComponent(serves || "")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Request Food</h2>
          {/* <p className="text-muted-foreground"></p> */}
          <Link href="/donate">
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Request Food</Button>
              </Link>
        </div>
      </div>
    </>
  );
}