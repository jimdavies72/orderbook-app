"use client";
import { useRouter } from "next/navigation";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { getInitials } from "@/lib/utils/helperFunctions";
import React, { Dispatch, SetStateAction } from "react";
import { Container, ResponseMessage } from "@/lib/utils/dataTypes";
import { getUserProfileData } from "@/services/profile.service";
import {
  Clock8,
  Clock11,
  SquareSlash,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { MultiSelect } from "@/components/multi-select";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  full: z.boolean(),
  complete: z.boolean(),
  supplierContainerNumber: z.string().min(3),
  shippingContainerNumber: z.string().min(1),
  addedToShippingForecast: z.boolean(),
  vesselName: z.string().min(1),
  shippingRoute: z.string().min(1),
  destinationPort: z.string().min(1),
  stuffingDate: z.coerce.date().optional(),
  sailingDate: z.coerce.date().optional(),
  etaUKPort: z.coerce.date().optional(),
  bookedInDate: z.coerce.date().optional(),
  bookedInSlot: z.array(z.string()),
  copyDocsReceived: z.string().min(1),
  plasticTaxDocsReceived: z.string().min(1),
  docsToFinance: z.string().min(1),
  contListSaved: z.string().min(1),
  value: z.coerce.number().min(0).default(0),
});

const bookingSlots = [
  {
    value: "8:30",
    label: "8:30",
    icon: Clock8,
  },
  {
    value: "11:00",
    label: "11:00",
    icon: Clock11,
  },
];

const pickListValues = [
  {
    value: "Y",
    label: "Yes",
    icon: ThumbsUp,
  },
  {
    value: "N",
    label: "No",
    icon: ThumbsDown,
  },
  {
    value: "N/A",
    label: "N/A",
    icon: SquareSlash,
  },
];

export const EditForm = ({
  setIsOpen,
  supplierId,
  containerId,
  containerRow,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  supplierId: string;
  containerId: string;
  containerRow?: Container | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierContainerNumber: containerRow?.supplierContainerNumber || "",
      shippingContainerNumber: containerRow?.shippingContainerNumber || "",
      complete: containerRow?.complete || false,
      full: containerRow?.full || false,
      addedToShippingForecast: containerRow?.addedToShippingForecast || false,
      vesselName: containerRow?.vesselName || "",
      shippingRoute: containerRow?.shippingRoute || "",
      destinationPort: containerRow?.destinationPort || "",
      stuffingDate: containerRow?.stuffingDate || null || undefined,
      sailingDate: containerRow?.sailingDate || null ||undefined,
      etaUKPort: containerRow?.etaUKPort || null || undefined,
      bookedInDate: containerRow?.bookedInDate || null || undefined,
      bookedInSlot: containerRow?.bookedInSlot || [],
      copyDocsReceived: containerRow?.copyDocsReceived || "N",
      plasticTaxDocsReceived: containerRow?.plasticTaxDocsReceived || "N",
      docsToFinance: containerRow?.docsToFinance || "N",
      contListSaved: containerRow?.contListSaved || "N",
      value: containerRow?.value || 0,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      const inits: string = getInitials(user.name);

      // default is assumed to be edit doc route
      let endpoint = "/containers/update";
      let httpVerb = "PUT";
      let payload = {};

      payload = {
        filterKey: "_id",
        filterValue: containerId,
        data: {
          ...values,
          updatedBy: inits,
        },
      };

      // come via the add doc route
      if (!containerRow) {
        endpoint = "/containers";
        httpVerb = "POST";
        payload = {
          supplier: supplierId,
          ...values,
          createdBy: inits,
          updatedBy: inits,
        };
      }

      const response: ResponseMessage = await httpRequest(
        endpoint,
        payload,
        httpVerb
      );

      if (response) {
        toast({
          duration: 1500,
          title: response.title,
          description: response.message,
        });
      } else {
        toast({
          duration: 2000,
          title: "Error",
          description: "Something went wrong",
        });
      }

      router.refresh();
      setIsOpen(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 sm:px-0 px-4"
      >
        <div className="flex items-center justify-left gap-4">
          <FormField
            name="full"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 align-middle">
                <FormLabel className="mr-2">Full:</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    id="full"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="addedToShippingForecast"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 align-middle">
                <FormLabel className="mr-2">Added to SF Sheet:</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    id="addedToShippingForecast"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="complete"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 align-middle">
                <FormLabel className="mr-2">Complete:</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    id="complete"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <FormField
            name="supplierContainerNumber"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                <FormLabel>Supplier Container Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123"
                    className="text-md"
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="shippingContainerNumber"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                <FormLabel>Shipping Container Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="XX1234"
                    className="text-md"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="value"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-44">
                <FormLabel>Value £</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="text-md font-bold"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-left gap-4">
          <FormField
            name="vesselName"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                <FormLabel>Vessel Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Vessel Name"
                    className="text-md"
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="shippingRoute"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                <FormLabel>Shipping Route</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Shipping Route"
                    className="text-md"
                    required
                    autoComplete="off"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="destinationPort"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                <FormLabel>UK Port</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Destination UK Port"
                    className="text-md"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-left gap-4">
          <FormField
            name="stuffingDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[20%] mr-[88px]">
                <FormLabel>Stuffing Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format<Date>(field.value, "PPP")
                          : undefined}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sailingDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[20%] mr-[88px]">
                <FormLabel>Sailing Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format<Date>(field.value, "PPP")
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="etaUKPort"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[20%]">
                <FormLabel>ETA @ UK Port</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-top justify-left gap-4">
          <FormField
            name="bookedInDate"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-[20%] mr-[88px]">
                <FormLabel>Booked In Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bookedInSlot"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-2 md:col-span-1 w-80">
                <FormLabel>Booked In Slot</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={bookingSlots}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select slots"
                    variant="inverted"
                    animation={0}
                    maxCount={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-left gap-6">
          <FormField
            name="copyDocsReceived"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copy of Docs Rec</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pickListValues &&
                      pickListValues.map((vals) => (
                        <SelectItem key={vals.value} value={vals.value}>
                          <div className="flex items-center">
                            <vals.icon className="mr-2 h-4 w-4" />
                            {vals.label}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="plasticTaxDocsReceived"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plastic Tax Docs Rec</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pickListValues &&
                      pickListValues.map((vals) => (
                        <SelectItem key={vals.value} value={vals.value}>
                          <div className="flex items-center">
                            <vals.icon className="mr-2 h-4 w-4" />
                            {vals.label}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="docsToFinance"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docs to Finance</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pickListValues &&
                      pickListValues.map((vals) => (
                        <SelectItem key={vals.value} value={vals.value}>
                          <div className="flex items-center">
                            <vals.icon className="mr-2 h-4 w-4" />
                            {vals.label}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="contListSaved"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cont List Saved</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pickListValues &&
                      pickListValues.map((vals) => (
                        <SelectItem key={vals.value} value={vals.value}>
                          <div className="flex items-center">
                            <vals.icon className="mr-2 h-4 w-4" />
                            {vals.label}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full sm:justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
