'use client';
import {useRouter} from 'next/navigation';
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import React, { Dispatch, ReactNode, SetStateAction, useState, FormEvent } from 'react';
import {Supplier, ResponseMessage} from '@/lib/utils/dataTypes';
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
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Router } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  supplierId: z.string().min(1),
  name: z.string().min(1),
  enabled: z.boolean().default(true),
});

export const EditForm = ({
  setIsOpen,
  supplierRow,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  supplierRow?: Supplier | null
}) =>{
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierId: supplierRow?.supplierId || "",
      name: supplierRow?.name || "",
      enabled: supplierRow?.enabled || true,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      const inits: string = getInitials(user.name);
      
      // default is assumed to be edit doc route
      let endpoint = "/suppliers/update";
      let httpVerb = "PUT";
      let payload = {};
      
      payload = {
        filterKey: "_id",
        filterValue: supplierRow?._id,
        supplier: {
          ...values,
          updatedBy: inits,
        },
      };
      
      // come via the add doc route
      if (!supplierRow) {
        endpoint = "/suppliers";
        httpVerb = "POST";
        payload = {
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
          title: response.title,
          description: response.message,
        });
      } else {
        toast({
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
          name="supplierId"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Supplier Id</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="xx1234"
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
          name="name"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Supplier name"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="enabled"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Enabled</FormLabel>
              <FormControl>
                <Checkbox
                  {...field}
                  className="text-md ml-2 align-bottom"
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
