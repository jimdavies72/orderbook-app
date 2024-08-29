'use client';
import {useRouter} from 'next/navigation';
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import React, { Dispatch, ReactNode, SetStateAction, useState, FormEvent } from 'react';
import {Audit, ResponseMessage} from '@/lib/utils/dataTypes';
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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';

export const ViewForm = ({
  setIsOpen,
  auditRow,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  auditRow?: Audit | null
}) =>{
  const form = useForm();

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async () => {
    try {
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
                <Textarea
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
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ViewForm;
