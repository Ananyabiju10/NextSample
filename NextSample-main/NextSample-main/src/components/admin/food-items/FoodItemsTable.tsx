
"use client";

import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from 'lucide-react';
import type { FoodItem } from "@/types";
import { ScrollArea } from '@/components/ui/scroll-area';

interface FoodItemsTableProps {
  foodItems: FoodItem[];
  onEdit: (foodItem: FoodItem) => void;
  onDelete: (foodItemId: string) => void;
}

export default function FoodItemsTable({ foodItems, onEdit, onDelete }: FoodItemsTableProps) {
  return (
    <ScrollArea className="h-[calc(100vh-18rem)] rounded-md border shadow-sm">
      <Table className="min-w-[700px]">
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No food items found. Add some to get started!
              </TableCell>
            </TableRow>
          ) : (
            foodItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover aspect-square"
                    data-ai-hint={`${item.category.toLowerCase()} ${item.name.toLowerCase().split(' ')[0]}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{item.description}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
