'use client';
import { useState } from "react";
import {useRouter} from 'next/navigation';
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import React, { Dispatch, SetStateAction } from 'react';
import {Container, ResponseMessage} from '@/lib/utils/dataTypes';
import { getUserProfileData } from '@/services/profile.service';

import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
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
  containerId: z.string().min(3),
  containerNumber: z.string().min(1),
  complete: z.boolean().default(false),
  value: z.coerce.number().min(0).default(0),
});

export const EditForm = ({
  setIsOpen,
  supplierId,
  containerId,
  containerRow,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  supplierId: string,
  containerId: string,
  containerRow?: Container | null
}) =>{
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      containerId: containerRow?.containerId || "",
      containerNumber: containerRow?.containerNumber || "",
      complete: containerRow?.complete,
      value: containerRow?.value || 0 ,
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
        <FormField
          name="containerId"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Container Id</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="123"
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
          name="containerNumber"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Container Number</FormLabel>
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
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Value £</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="text-md"
                  required
                  autoFocus
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
