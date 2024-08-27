'use client';
import {useRouter} from 'next/navigation';
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import React, { Dispatch, ReactNode, SetStateAction, useState, FormEvent } from 'react';
import {Order, ResponseMessage} from '@/lib/utils/dataTypes';
import { getUserProfileData } from '@/services/profile.service';

import { Button } from '@/components/ui/button';
import { useToast} from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  orderNumber: z.string().min(1),
  forPurchasing: z.coerce.number().min(0),
  productCode: z.string().min(1),
  customer: z.string().min(1),
});

export const EditForm = ({
  supplier,
  container,
  setIsOpen,
  orderRow,
}: {
  supplier: string,
  container: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  orderRow?: Order | null
}) =>{
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: orderRow?.orderNumber || "",
      forPurchasing: orderRow?.forPurchasing || 0,
      productCode: orderRow?.productCode || "",
      customer: orderRow?.customer || "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      const inits: string = getInitials(user.name);
      
      // default is assumed to be edit doc route
      let endpoint = "/orders/update";
      let httpVerb = "PUT";
      let payload = {};
      
      payload = {
        filterKey: "_id",
        filterValue: orderRow?._id,
        order: {
          ...values,
          updatedBy: inits,
        },
      };
      
      // come via the add doc route
      if (!orderRow) {
        endpoint = "/orders";
        httpVerb = "POST";
        payload = {
          container: container,
          supplier: supplier,
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
        router.refresh();
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

      setIsOpen(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="orderNumber"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Order No</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1234"
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
          name="forPurchasing"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>For Purchasing</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="0.275"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="productCode"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Product Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="IBC-K150-02 (PC)"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="customer"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Customer</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="MB Games Ltd"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
