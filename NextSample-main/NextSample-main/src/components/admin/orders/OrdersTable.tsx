
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { XCircle } from 'lucide-react';
import type { Order, OrderStatus } from "@/types";
import { orderStatuses } from "@/lib/mockData";
import { format } from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onCancelOrder: (orderId: string) => void;
}

const getStatusBadgeVariant = (status: OrderStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Pending': return 'outline'; // Yellowish in some themes
    case 'Processing': return 'default'; // Blueish/Primary
    case 'Shipped': return 'secondary'; // Greenish/Accent
    case 'Delivered': return 'default'; // Might need a custom 'success' variant
    case 'Cancelled': return 'destructive';
    default: return 'default';
  }
};

export default function OrdersTable({ orders, onUpdateStatus, onCancelOrder }: OrdersTableProps) {
  const formatOrderItems = (items: Order['items']) => {
    if (items.length === 0) return 'No items';
    if (items.length <= 2) return items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    return `${items.slice(0, 2).map(item => `${item.name} (x${item.quantity})`).join(', ')} + ${items.length - 2} more`;
  };
  
  return (
    <ScrollArea className="h-[calc(100vh-18rem)] rounded-md border shadow-sm">
      <Table className="min-w-[900px]">
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{format(new Date(order.orderDate), 'PPp')}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate" title={order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}>
                  {formatOrderItems(order.items)}
                </TableCell>
                <TableCell className="text-right">${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">{order.status}</Badge>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  <Select
                    value={order.status}
                    onValueChange={(newStatus) => onUpdateStatus(order.id, newStatus as OrderStatus)}
                    disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                  >
                    <SelectTrigger className="w-[130px] h-9 text-xs inline-flex" aria-label={`Update status for ${order.id}`}>
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map(status => (
                        <SelectItem key={status} value={status} className="text-xs">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onCancelOrder(order.id)}
                      aria-label={`Cancel order ${order.id}`}
                      className="h-9 w-9"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
