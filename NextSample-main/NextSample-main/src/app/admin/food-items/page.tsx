"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FoodItemsTable from "@/components/admin/food-items/FoodItemsTable";
import FoodItemForm, { foodItemSchema } from "@/components/admin/food-items/FoodItemForm";
import DeleteFoodItemDialog from "@/components/admin/food-items/DeleteFoodItemDialog";
import { initialFoodItems } from "@/lib/mockData";
import type { FoodItem } from "@/types";
import { PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { z } from "zod";

type FoodItemFormValues = z.infer<typeof foodItemSchema>;

export default function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFoodItem, setEditingFoodItem] = useState<FoodItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingFoodItemId, setDeletingFoodItemId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch data here. For now, use mock data.
    // Simulate data fetching for professional feel
    const timer = setTimeout(() => {
      setFoodItems(initialFoodItems);
    }, 500); // Small delay to simulate loading
    return () => clearTimeout(timer);
  }, []);


  const handleOpenDialog = (foodItem?: FoodItem) => {
    setEditingFoodItem(foodItem || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingFoodItem(null);
  };

  const handleSubmitForm = (data: FoodItemFormValues) => {
    if (editingFoodItem) {
      // Edit existing item
      setFoodItems(foodItems.map(item => item.id === editingFoodItem.id ? { ...item, ...data } : item));
      toast({ title: "Success!", description: `"${data.name}" updated successfully.`, variant: "default" });
    } else {
      // Add new item
      const newItem: FoodItem = { id: crypto.randomUUID(), ...data };
      setFoodItems([newItem, ...foodItems]);
      toast({ title: "Success!", description: `"${data.name}" added to the menu.`, variant: "default" });
    }
    handleCloseDialog();
  };

  const handleDeletePrompt = (foodItemId: string) => {
    setDeletingFoodItemId(foodItemId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingFoodItemId) {
      const itemToDelete = foodItems.find(item => item.id === deletingFoodItemId);
      setFoodItems(foodItems.filter(item => item.id !== deletingFoodItemId));
      setIsDeleteDialogOpen(false);
      setDeletingFoodItemId(null);
      if (itemToDelete) {
        toast({ title: "Deleted!", description: `"${itemToDelete.name}" has been removed.`, variant: "destructive" });
      }
    }
  };

  const itemToGetNameForDelete = foodItems.find(item => item.id === deletingFoodItemId)?.name || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold text-foreground">Food Items Management</h1>
          <p className="mt-1 text-muted-foreground">Add, edit, or remove food items from your cafe's menu.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Item
        </Button>
      </div>

      <FoodItemsTable foodItems={foodItems} onEdit={handleOpenDialog} onDelete={handleDeletePrompt} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
           <FoodItemForm
            foodItem={editingFoodItem}
            onSubmit={handleSubmitForm}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      <DeleteFoodItemDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={itemToGetNameForDelete}
      />
    </div>
  );
}
