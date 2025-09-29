
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, Wand2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { suggestPrice } from "@/ai/flows/smart-pricing-tool";
import type { SmartPricingInput } from "@/ai/flows/smart-pricing-tool";

const formSchema = z.object({
  cropName: z.string().min(2, "Crop name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  harvestDate: z.date({
    required_error: "A harvest date is required.",
  }),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  location: z.string().min(2, "Location is required"),
  farmingMethod: z.enum(["organic", "conventional"], {
    required_error: "You need to select a farming method.",
  }),
  pesticidesUsed: z.enum(["yes", "no"]),
  expectedYield: z.coerce.number().min(1, "Expected yield is required"),
  cropImage: z.any().optional(),
  organicCert: z.any().optional(),
});

interface AddCropFormProps {
  onCropAdded: (values: z.infer<typeof formSchema>) => void;
}


export function AddCropForm({ onCropAdded }: AddCropFormProps) {
  const { toast } = useToast();
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      quantity: 100,
      price: 20,
      location: "Pune, Maharashtra",
      farmingMethod: "conventional",
      pesticidesUsed: "yes",
      expectedYield: 500,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onCropAdded(values);
    form.reset();
  }

  async function handleSuggestPrice() {
    const values = form.getValues();
    if (!values.cropName || !values.quantity || !values.harvestDate) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in Crop Name, Quantity, and Harvest Date to suggest a price.",
        });
        return;
    }
    
    setIsSuggestingPrice(true);
    try {
        const input: SmartPricingInput = {
            cropName: values.cropName,
            quantity: values.quantity,
            harvestDate: format(values.harvestDate, "yyyy-MM-dd"),
            pesticidesUsed: values.pesticidesUsed === "yes",
            location: values.location,
            farmingMethod: values.farmingMethod,
            expectedYield: values.expectedYield,
        };
        const result = await suggestPrice(input);
        form.setValue("price", result.suggestedPrice, { shouldValidate: true });
        toast({
            title: "Price Suggested!",
            description: (
                <div>
                    <p className="font-bold">Suggested Price: ₹{result.suggestedPrice}/kg</p>
                    <p className="text-xs mt-2">{result.reasoning}</p>
                </div>
            )
        })
    } catch (error) {
        console.error("Error suggesting price:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not suggest a price at this time.",
        });
    } finally {
        setIsSuggestingPrice(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Crop</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="cropName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Crop Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Tomatoes" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Quantity (in kg)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="harvestDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Harvest Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date > addDays(new Date(), 30) || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Nashik, Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price (per kg)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="25" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="button" variant="outline" onClick={handleSuggestPrice} disabled={isSuggestingPrice}>
                    {isSuggestingPrice ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Suggest Price with AI
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="farmingMethod"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Farming Method</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="conventional">Conventional</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pesticidesUsed"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Pesticides Used</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center space-x-4"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="expectedYield"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Expected Yield (kg per hectare)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="cropImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Crop Image</FormLabel>
                            <FormControl>
                                <Button asChild variant="outline" className="w-full">
                                    <label>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Image
                                        <Input type="file" className="hidden" value={undefined} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                    </label>
                                </Button>
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="organicCert"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organic Certification</FormLabel>
                            <FormControl>
                                <Button asChild variant="outline" className="w-full" disabled={form.watch('farmingMethod') !== 'organic'}>
                                     <label>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Certificate
                                        <Input type="file" className="hidden" value={undefined} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} />
                                    </label>
                                </Button>
                            </FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


            <Button type="submit" className="w-full">List Crop on Marketplace</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
