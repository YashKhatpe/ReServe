"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Donation, useDonation } from "@/context/donation-context";

export default function FoodListingPage() {
  const [donations, setDonations] = useState<Donation[] | []>([]);
  const router = useRouter();
  const { setSelectedDonation } = useDonation();

  useEffect(() => {
    async function fetchDonations() {
      const { data, error } = await supabase.from('donor_form').select('*');
      
      if (error) {
        console.error("Error fetching donations:", error);
      } else {
        const donationsWithDistance = await Promise.all(data.map(async (donation) => {
          const { data: donorData, error: donorError } = await supabase
            .from('donor')
            .select('address_map_link')
            .eq('id', donation.donor_id)
            .single();

          if (donorError) {
            console.error("Error fetching donor address:", donorError);
            return donation;
          }
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            
            console.error("User is not authenticated");
            return donation;
          }
          const { data: ngoData, error: ngoError } = await supabase
            .from('ngo')
            .select('address_map_link')
            .eq('id', user.id)
            .single();

          if (ngoError) {
            console.error("Error fetching NGO address:", ngoError);
            return donation;
          }

          const response = await fetch('/api/getDistance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url1: donorData.address_map_link,
              url2: ngoData.address_map_link,
            }),
          });

          const distanceData = await response.json();
          console.log(distanceData);
          return { ...donation, distance: distanceData.distance };
        }));

        setDonations(donationsWithDistance);
      }
    }

    fetchDonations();
  }, []);

  const handleCardClick = (donation: Donation) => {
    setSelectedDonation(donation);
    router.push("/products");
  };

  return (
    <>
      <Navbar />
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
              {donations.map((donation) => (
                <div 
                  key={donation.id} 
                  className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 cursor-pointer"
                  onClick={() => handleCardClick(donation)}
                >
                  <div className="w-full h-48 relative">
                    <Image src={donation.food_image} alt={donation.food_name} fill className="object-cover"/>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900">{donation.food_name}</h2>
                    <p className="text-emerald-600">{donation.food_type}</p>
                    <p className="text-gray-600">Expires in {new Date(donation.expiry_date_time).toLocaleString()}</p>
                    <p className="text-gray-600">Distance: {Math.round(donation.distance * 100)/100} km</p>
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
