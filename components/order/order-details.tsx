"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  AlertCircle,
  MapPin,
  Phone,
  Calendar
} from "lucide-react";


type Status = "delivering" | "delivered";

const statusIcons: Record<Status, string> = {
  delivering: "🕒",
  delivered: "✅",
};

const currentStatus: Status = "delivering"; // Define the type explicitly
const icon = statusIcons[currentStatus];

interface StatusStepProps {
    status: OrderStatus;
    currentStatus: OrderStatus;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isLast?: boolean;
  }
  

// Status step component
function StatusStep({ status, currentStatus, label, icon: Icon, isLast = false }: StatusStepProps) {
  const isCompleted = getStatusOrder(currentStatus) >= getStatusOrder(status);
  const isActive = currentStatus === status;
  
  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isCompleted 
            ? 'bg-indigo-600 border-indigo-600' 
            : 'border-gray-300 bg-white'
        }`}>
          <Icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
        </div>
        {!isLast && (
          <div className={`h-12 w-0.5 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-200'}`} />
        )}
      </div>
      <div className="ml-4 mt-0.5">
        <p className={`text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-900'}`}>
          {label}
        </p>
        {isActive && (
          <p className="text-xs text-gray-500 mt-0.5">
            {getStatusMessage(status)}
          </p>
        )}
      </div>
    </div>
  );
}


type OrderStatus = 'delivered' | 'delivering';
// Helper function to get status order for comparison
function getStatusOrder(status:OrderStatus) {
  const order = {
    'delivering': 0,
    'delivered': 3,
  };
  return order[status] || 0;
}

// Helper function to get status message
function getStatusMessage(status : OrderStatus) {
  const messages = {
    'delivering': 'Your order is in the delivering phase',
    'delivered': 'Your order has been successfully delivered.',
    
  };
  return messages[status] || '';
}

interface OrderItem {
    name: string;
    quantity: number;
  }
  
  interface Order {
    id: string;
    date: string;
    deliveryDate: string;
    address: string;
    contact: string;
    status: "delivered" | "delivering";
    items: OrderItem[];
    total: string;
  }
  
  interface OrderDetailsProps {
    order: Order;
    onClose: () => void;
  }
  

export function OrderDetails({ order, onClose }:OrderDetailsProps) {
  // Don't show the tracking steps for cancelled orders
  const showTrackingSteps = order.status !== 'delivering';

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Order Details - {order.id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
              <p className="mt-1 flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                {order.date}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Expected Delivery</h3>
              <p className="mt-1 flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                {order.deliveryDate}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Delivery Address</h3>
              <p className="mt-1 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                {order.address}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact</h3>
              <p className="mt-1 flex items-center gap-1">
                <Phone className="h-4 w-4 text-gray-400" />
                {order.contact}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Order Items</h3>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">{order.total}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          {showTrackingSteps ? (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Order Status</h3>
              <div className="space-y-0">
                <StatusStep 
                  status="delivering" 
                  currentStatus={order.status} 
                  label="Order Placed" 
                  icon={Clock} 
                />
                <StatusStep 
                  status="delivered" 
                  currentStatus={order.status} 
                  label="Delivered" 
                  icon={CheckCircle2} 
                  isLast={true}
                />
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-md flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Order Cancelled</h3>
                <p className="mt-1 text-sm text-red-700">
                  This order has been cancelled and will not be processed.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Download Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}