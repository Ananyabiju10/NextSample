
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { FoodItem, DietaryType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { foodCategories, foodItemMoods, dietaryTypes } from "@/lib/mockData";

export const foodItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.coerce.number().positive("Price must be a positive number"),
  category: z.string().min(2, "Category is required"),
  imageUrl: z.string().url("Must be a valid image URL").min(1, "Image URL is required"),
  mood: z.enum(foodItemMoods).optional(),
  isFeatured: z.boolean().optional(),
  dietaryType: z.enum(dietaryTypes as [DietaryType, ...DietaryType[]]).optional(),
});

type FoodItemFormValues = z.infer<typeof foodItemSchema>;

interface FoodItemFormProps {
  foodItem?: FoodItem | null; // For editing
  onSubmit: (data: FoodItemFormValues) => void;
  onClose: () => void;
}

export default function FoodItemForm({ foodItem, onSubmit, onClose }: FoodItemFormProps) {
  const form = useForm<FoodItemFormValues>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: foodItem ? {
      name: foodItem.name,
      description: foodItem.description,
      price: foodItem.price,
      category: foodItem.category,
      imageUrl: foodItem.imageUrl,
      mood: foodItem.mood as typeof foodItemMoods[number] | undefined,
      isFeatured: foodItem.isFeatured === undefined ? undefined : foodItem.isFeatured,
      dietaryType: foodItem.dietaryType,
    } : {
      name: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: "",
      mood: undefined,
      isFeatured: false,
      dietaryType: undefined,
    },
  });

  const handleFormSubmit = (data: FoodItemFormValues) => {
    onSubmit(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-headline">{foodItem ? "Edit Food Item" : "Add New Food Item"}</DialogTitle>
        <DialogDescription>
          {foodItem ? "Update the details of the food item." : "Fill in the details to add a new food item to the menu."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Classic Burger" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the food item..." {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://placehold.co/600x400.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Dietary Type (Optional)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-x-4 gap-y-2"
                  >
                    {dietaryTypes.map((type) => (
                      <FormItem key={type} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={type} />
                        </FormControl>
                        <FormLabel className="font-normal">{type}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>Specify if the item is vegetarian or non-vegetarian.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Mood (Optional)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-x-4 gap-y-2"
                  >
                    {foodItemMoods.map((mood) => (
                      <FormItem key={mood} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={mood} />
                        </FormControl>
                        <FormLabel className="font-normal">{mood}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>Select a mood that best describes this item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Featured Product?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value === undefined ? undefined : String(field.value)}
                    className="flex flex-wrap gap-x-4 gap-y-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Mark this item as a featured product on the menu.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {foodItem ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
