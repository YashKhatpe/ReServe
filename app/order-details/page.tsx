"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Ngo = {
    name: string,
}
type DonorForm = {
    food_name: string
}
type Orders = {
    id: string,
    delivery_person_name: string,
    delivery_person_phone_no: number,
    donor_form: DonorForm,
    ngo: Ngo
    serves: number,
    delivery_status: 'delivering' | 'delivered',
    rating: number,
    feedback: string

}
export default function OrderDetailsPage() {
    const [filter, setFilter] = useState<string>("ALL");
    const [orders, setOrders] = useState<Orders[]| []>([]);
    const [filteredOrders, setFilteredOrders] = useState<Orders[] | []>([]);

    const handleStatusChange = (orderId: string, newStatus: 'delivering' | 'delivered') => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, delivery_status: newStatus } : order
          )
        );
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, delivery_status: newStatus } : order
          )
        );
      };

    useEffect(() => {
        const fetchOrders = async () => {
          const { data, error } = await supabase
            .from("orders")
            .select(`
              id, 
              serves, 
              ngo:ngo_id (name), 
              donor_form:donor_form_id (food_name), 
              delivery_person_name,
              delivery_person_phone_no,
              delivery_status
            `);
      
          if (error) {
            console.error("Error fetching orders:", error);
            return;
          }
      
          // 🔥 Fix: Flatten `ngo` and `donor_form` + Add `rating` & `feedback`
          console.log("First: ",data[0]);
          const formattedData: Orders[] = data.map(order => ({
            id: order.id,
            serves: order.serves,
            ngo: order.ngo?.[0]?.name || "Unknown NGO", // ✅ Handle array case
            donor_form: order.donor_form?.[0]?.food_name || "Unknown Food", // ✅ Handle array case
            delivery_person_name: order.delivery_person_name,
            delivery_person_phone_no: order.delivery_person_phone_no,
            delivery_status: order.delivery_status,
            rating: 0, 
            feedback: "", 
          }));
          
          
      
          setOrders(formattedData);
          setFilteredOrders(formattedData);
        };
      
        fetchOrders();
      }, []);
      
      
    const ratingCaptions = ["Terrible", "Bad", "Average", "Good", "Excellent"];

    return (    
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Details</h1>

                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                    {["ALL", "Delivered", "Delivering"].map((status) => (
                        <Button
                            key={status}
                            className={`px-6 py-2 font-medium text-sm rounded-md transition ${
                                filter === status ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                            onClick={() => setFilter(status)}
                        >
                            {status}
                        </Button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg text-left">
                        <thead>
                            <tr className="bg-gray-100 text-gray-900">
                                <th className="p-4 border border-gray-300">Order ID</th>
                                <th className="p-4 border border-gray-300">Delivery Status</th>
                                <th className="p-4 border border-gray-300">Serves</th>
                                <th className="p-4 border border-gray-300">Delivery Person</th>
                                <th className="p-4 border border-gray-300">Contact</th>
                                {filter !== "Delivering" && <th className="p-4 border border-gray-300">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders && filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-300">
                                    <td className="p-4 border border-gray-300">{order.id}</td>
                                    <td className="p-4 border border-gray-300">
                                        <span
                                            className={`px-3 py-1 rounded-md font-medium ${
                                                order.delivery_status === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {order.delivery_status ?? "delivering"}
                                        </span>
                                    </td>
                                    <td className="p-4 border border-gray-300">{order.serves}</td>
                                    <td className="p-4 border border-gray-300">{order.delivery_person_name}</td>
                                    <td className="p-4 border border-gray-300">{order.delivery_person_phone_no}</td>
                                    {filter !== "Delivering" && (
                                        <td className="p-4 border border-gray-300">
                                            <Button
                                                onClick={() => handleStatusChange(order.id, order.delivery_status === 'delivering' ? 'delivered' : 'delivering')}
                                            >
                                                {order.delivery_status === 'delivering' ? 'Mark as Delivered' : 'Mark as Delivering'}
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
