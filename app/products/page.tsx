"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Globe, BatteryWarning, ArrowLeft, Sprout } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useDonation } from "@/context/donation-context";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";

export default function ProductDetailPage() {
  const { selectedDonation } = useDonation();
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!selectedDonation) {
      router.push("/donations");
    }
  }, [selectedDonation, router]);

  // Show loading or redirect if no donation is selected
  if (!selectedDonation) {
    return <div className="p-4">Loading...</div>;
  }

  const orderForm = useForm({
    defaultValues: {
      serves: 1,
      deliveryName: "",
      contactNumber: "",
    },
  });

  interface OrderFormData {
    serves: number;
    deliveryName: string;
    contactNumber: string;
  }

  const onOrderPlaced = async (data: OrderFormData) => {
    console.log("Submitting Order Form:", data);

    try {
        const { error } = await supabase.from("orders").insert([
            {
                serves: data.serves,
                delivery_name: data.deliveryName,
                contact_number: data.contactNumber,
                otp: otp,
                donation_id: selectedDonation.id,
            },
        ]);
        if (error) throw error;
        console.log("Order placed successfully!");
    } catch (error: any) {
        console.error("Error placing order:", error.message);
    }
  };

  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(newOtp);
    // alert(`Your OTP is: ${newOtp}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2 mb-6">
          <Button
            className="w-[100px] p-6 gap-2 text-gray-700 hover:text-emerald-600"
            variant="ghost"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{selectedDonation.food_name}</h1>
        </div>

        {/* Main Content Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="rounded-lg overflow-hidden w-full h-full relative">
            <Image
              src={selectedDonation.food_image}
              alt={selectedDonation.food_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side - Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Details</h2>
              <Separator />

              {/* Grid Layout for Structured View */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Distance 1 */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pickup Location</p>
                    <p className="text-sm text-muted-foreground">{Math.round(selectedDonation.distance * 100) / 100} km away</p>
                  </div>
                </div>

                {/* Distance 2 */}
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-sm text-muted-foreground">{selectedDonation.food_type}</p>
                  </div>
                </div>

                {/* Preferred Pickup Time 1 */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pickup Time</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDonation.preferred_pickup_time}
                    </p>
                  </div>
                </div>

                {/* Preferred Pickup Time 2 */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Preparation Time</p>
                    <p className="text-sm text-muted-foreground">{new Date(selectedDonation.preparation_date_time).toLocaleDateString()} {new Date(selectedDonation.preparation_date_time).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* Expiry Date 1 */}
                <div className="flex items-center gap-2">
                  <BatteryWarning className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Expiry Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedDonation.expiry_date_time).toLocaleDateString()} {new Date(selectedDonation.expiry_date_time).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Expiry Date 2 */}
                <div className="flex items-center gap-2">
                  <BatteryWarning className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Storage</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDonation.storage}
                    </p>
                  </div>
                </div>

                {/* Serves 1 */}
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Serves</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDonation.serves}
                    </p>
                  </div>
                </div>

                {/* Serves 2 */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Food Section */}
        <div className="mt-8 flex items-center justify-center">
          <Button
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700 p-6 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Request Food
          </Button>
        </div>

        {/* Popup Form */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <form onSubmit={orderForm.handleSubmit(onOrderPlaced)}>
            <DialogContent className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white transition-all duration-300">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
                  Request Food
                </DialogTitle>
              </DialogHeader>

              {/* Form Fields */}
              <div className="space-y-5 mt-3">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="serves" className="text-gray-700 font-medium">
                    Number of Serves
                  </Label>
                  <Input
                    id="serves"
                    type="number"
                    max={selectedDonation.serves}
                    placeholder="Enter number of serves"
                    className="w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg p-2"
                    {...orderForm.register("serves")}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="deliveryName" className="text-gray-700 font-medium">
                    Delivery Person's Name
                  </Label>
                  <Input
                    id="deliveryName"
                    type="text"
                    placeholder="Enter name"
                    className="w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg p-2"
                    {...orderForm.register("deliveryName")}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="contactNumber" className="text-gray-700 font-medium">
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg p-2"
                    {...orderForm.register("contactNumber")}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="otp" className="text-gray-700 font-medium">
                    OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg p-2"
                    value={otp}
                    readOnly
                  />
                </div>
              </div>

              {/* Buttons - Center Aligned */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-md cursor-pointer"
                  onClick={generateOtp}
                >
                  Generate OTP
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-md cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md cursor-pointer"
                >
                  Place Order
                </Button>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  );
}
