"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, ClipboardList, DollarSign, Users } from 'lucide-react';
import { initialFoodItems, initialOrders } from '@/lib/mockData'; // Using mock data for counts

export default function AdminDashboardPage() {
  const totalFoodItems = initialFoodItems.length;
  const totalOrders = initialOrders.length;
  const totalRevenue = initialOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = initialOrders.filter(order => order.status === 'Pending').length;

  const summaryCards = [
    { title: "Total Food Items", value: totalFoodItems, icon: UtensilsCrossed, color: "text-primary" },
    { title: "Total Orders", value: totalOrders, icon: ClipboardList, color: "text-accent" },
    { title: "Pending Orders", value: pendingOrders, icon: ClipboardList, color: "text-yellow-500" },
    { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back, Admin! Here's an overview of your cafe.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed placeholder. Display recent orders or item updates here.</p>
            {/* Example recent activity item */}
            <ul className="mt-4 space-y-3">
              {initialOrders.slice(0,3).map(order => (
                 <li key={order.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <span className="text-sm">{order.customerName} placed an order ({order.id})</span>
                    <span className="text-xs text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</span>
                 </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/admin/food-items" className="block text-primary hover:underline">Manage Food Items</a>
            <a href="/admin/orders" className="block text-primary hover:underline">View All Orders</a>
            <p className="text-muted-foreground">More links can be added here for settings, reports, etc.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
