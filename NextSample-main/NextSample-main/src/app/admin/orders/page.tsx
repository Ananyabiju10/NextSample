"use client";

import { useState, useEffect } from 'react';
import OrdersTable from "@/components/admin/orders/OrdersTable";
import CancelOrderDialog from "@/components/admin/orders/CancelOrderDialog";
import { initialOrders } from "@/lib/mockData";
import type { Order, OrderStatus } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch data here. For now, use mock data.
    // Simulate data fetching
    const timer = setTimeout(() => {
      setOrders(initialOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({ title: "Status Updated", description: `Order ${orderId} status changed to ${newStatus}.`});
  };

  const handleCancelOrderPrompt = (orderId: string) => {
    setCancelingOrderId(orderId);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancelOrder = () => {
    if (cancelingOrderId) {
      handleUpdateStatus(cancelingOrderId, 'Cancelled');
      setIsCancelDialogOpen(false);
      setCancelingOrderId(null);
      toast({ title: "Order Cancelled", description: `Order ${cancelingOrderId} has been cancelled.`, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold text-foreground">Order Management</h1>
        <p className="mt-1 text-muted-foreground">View and manage all customer orders for your cafe.</p>
      </div>
      
      <OrdersTable
        orders={orders}
        onUpdateStatus={handleUpdateStatus}
        onCancelOrder={handleCancelOrderPrompt}
      />

      <CancelOrderDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleConfirmCancelOrder}
        orderId={cancelingOrderId || ""}
      />
    </div>
  );
}
