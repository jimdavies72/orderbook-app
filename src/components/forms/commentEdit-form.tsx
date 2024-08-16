'use client';
import {useRouter} from 'next/navigation';
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import React, { Dispatch, ReactNode, SetStateAction, useState, FormEvent } from 'react';
import {Comment, ResponseMessage} from '@/lib/utils/dataTypes';
import { getUserProfileData } from '@/services/profile.service';

import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast";
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
import { Loader2, Router } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  container: z.object({}),
  order: z.object({}),
  comment: z.string().min(1),
  customer: z.string().min(1),
  createdBy: z.string().min(1),
  createdAt: z.string().min(1),
  updatedBy: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const EditForm = ({
  setIsOpen,
  commentRow,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  commentRow?: Comment | null
}) =>{
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      container: commentRow?.container || undefined,
      order: commentRow?.order || undefined,
      comment: commentRow?.comment || "",
      createdBy: commentRow?.createdBy || "",
      createdAt: commentRow?.createdAt || "",
      updatedBy: commentRow?.updatedBy || "",
      updatedAt: commentRow?.updatedAt || "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      const inits: string = getInitials(user.name);
      
      // default is assumed to be edit doc route
      let endpoint = "/comments";
      let httpVerb = "PATCH";
      let payload = {};
      
      payload = {
        filterKey: "_id",
        filterValue: commentRow?._id,
        data: {
          ...values,
          updatedBy: inits,
        },
      };
      
      // come via the add doc route
      if (!commentRow) {
        endpoint = "/comments";
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
          name="comment"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter comment here"
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
