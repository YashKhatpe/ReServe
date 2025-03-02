"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Sprout, ArrowLeft } from "lucide-react";
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
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function ProductDetailPage() {
    const { selectedDonation } = useDonation();
    const [isOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [serves, setServes] = useState("");
    const [delivery_person_name, setDeliveryPersonName] = useState("");
    const [delivery_person_phone_no, setDeliveryPersonPhoneNo] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!selectedDonation) {
            router.push("/donate");
        }
    }, [selectedDonation, router]);

    if (!selectedDonation) {
        return <div className="p-4">Loading...</div>;
    }

    const generateOTP = () => {
        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setOtp(newOtp);
    };

    const onOrderPlaced = async () => {
        if  (!delivery_person_name) {
            alert("Please enter the name of the delivery person.");
            return;
        }

        if (!delivery_person_phone_no || delivery_person_phone_no.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!serves || isNaN(Number(serves)) || Number(serves) < 1) {
            alert("Please enter a valid number of serves (at least 1).");
            return;
        }

        if (!otp || otp.length !== 4) {
            alert("OTP must be exactly 4 digits.");
            return;
        }

        try {
            const uniqueId = uuidv4();
            const {data: {user}} = await supabase.auth.getUser();
            if(!user) return;
            const { error } = await supabase.from("orders").insert([
                {
                    id: uniqueId,
                    donor_form_id: selectedDonation.id,
                    ngo_id: user.id,
                    serves: Number(serves),
                    otp: otp,
                    created_at: new Date(),
                    delivery_person_name: delivery_person_name,
                    delivery_person_phone_no: delivery_person_phone_no,
                },
            ]);
            if (error) throw error;
            toast("Success", {
                description:"The order was placed successfully"
            })
            console.log("Order placed successfully!");
            setIsOpen(false);
        } catch (error: any) {
            toast("Fail", {
                description:"Error placing order"
            })
            console.error("Error placing order:", error.message);
        }
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

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded-lg overflow-hidden w-full h-full relative">
                        <Image
                            src={selectedDonation.food_image}
                            alt={selectedDonation.food_name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-bold">Details</h2>
                            <Separator />
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Pickup Location</p>
                                        <p className="text-sm text-muted-foreground">0.5 km away</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Sprout className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Type</p>
                                        <p className="text-sm text-muted-foreground">{selectedDonation.food_type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Pickup Time</p>
                                        <p className="text-sm text-muted-foreground">
                                            {selectedDonation.preferred_pickup_time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 flex items-center justify-center">
                    <Button
                        variant="default"
                        className="bg-emerald-600 hover:bg-emerald-700 p-6 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        Request Food
                    </Button>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="p-6 rounded-xl shadow-xl border bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-center">
                                Request Food
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-5 mt-3">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="serves">Number of Serves</Label>
                                <Input
                                    id="serves"
                                    type="number"
                                    value={serves}
                                    onChange={(e) => setServes(e.target.value)}
                                    placeholder="Enter number of serves"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="delivery_person_name">Delivery Person Name</Label>
                                <Input
                                    id="delivery_person_name"
                                    type="text"
                                    value={delivery_person_name}
                                    onChange={(e) => setDeliveryPersonName(e.target.value)}
                                    placeholder="Enter name of delivery person"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="delivery_person_phone_no">Number of Delivery Person</Label>
                                <Input
                                    id="delivery_person_phone_no"
                                    type="tel"
                                    value={delivery_person_phone_no}
                                    onChange={(e) => setDeliveryPersonPhoneNo(e.target.value)}
                                    placeholder="Enter number of serves"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="otp">OTP</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        className="w-full"
                                    />
                                    <Button type="button" onClick={generateOTP} className="bg-blue-500">
                                        Generate OTP
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={onOrderPlaced} className="bg-emerald-600 hover:bg-emerald-700">
                                Submit Request
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}