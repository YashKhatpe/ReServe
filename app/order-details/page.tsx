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
    // const deliveryStatus: { [key: string]: string } = {
    //     "#123456": "Delivered",
    //     "#123457": "Delivering",
    // };

    // const orders = [
    //     {
    //         orderId: "#123456",
    //         ngoName: "Helping Hands Foundation",
    //         item: "Butter Chicken",
    //         serves: "4 People",
    //         deliveryPerson: "Amit Sharma",
    //         contact: "+91 9876543210",
    //         rating: 5,
    //         feedback: "Great service! The food was warm and delivered on time.",
    //     },
    //     {
    //         orderId: "#123457",
    //         ngoName: "Food for All Initiative",
    //         item: "Dal Rice",
    //         serves: "3 People",
    //         deliveryPerson: "Ravi Kumar",
    //         contact: "+91 9823456789",
    //     },
    // ];

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
    // let filteredOrders;
    // if(orders.length != 0) {

    //     filteredOrders = orders.filter((order) => {
    //         if (filter === "ALL") return true;
    //         return deliveryStatus[order.id] === filter;
    //     });
    // }

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
                                {/* <th className="p-4 border border-gray-300">NGO Name</th> */}
                                <th className="p-4 border border-gray-300">Delivery Status</th>
                                {/* <th className="p-4 border border-gray-300">Item Ordered</th> */}
                                <th className="p-4 border border-gray-300">Serves</th>
                                <th className="p-4 border border-gray-300">Delivery Person</th>
                                <th className="p-4 border border-gray-300">Contact</th>
                                {filter !== "Delivering" && <th className="p-4 border border-gray-300">Rating</th>}
                                {filter !== "Delivering" && <th className="p-4 border border-gray-300">Feedback</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders && filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-300">
                                    <td className="p-4 border border-gray-300">{order.id}</td>
                                    {/* <td className="p-4 border border-gray-300">{order.ngo.name}</td> */}
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
                                    {/* <td className="p-4 border border-gray-300">{order.donor_form.food_name}</td> */}
                                    <td className="p-4 border border-gray-300">{order.serves}</td>
                                    <td className="p-4 border border-gray-300">{order.delivery_person_name}</td>
                                    <td className="p-4 border border-gray-300">{order.delivery_person_phone_no}</td>

                                    {/* Rating (only for Delivered orders) */}
                                    {order.delivery_status === "delivered" && (
                                        <td className="p-4 border border-gray-300 text-center">
                                            <div className="flex justify-center space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-6 h-6 ${
                                                            star <= (order.rating || 0) ? "text-yellow-500" : "text-gray-300"
                                                        }`}
                                                        fill={star <= (order.rating || 0) ? "currentColor" : "none"}
                                                        stroke="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            {order.rating && (
                                                <span className="text-sm text-gray-700 mt-1 block">
                                                    {ratingCaptions[order.rating - 1]}
                                                </span>
                                            )}
                                        </td>
                                    )}

                                    {/* Feedback (only for Delivered orders) */}
                                    {order.delivery_status === "delivered" && (
                                        <td className="p-4 border border-gray-300">{order.feedback}</td>
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
    