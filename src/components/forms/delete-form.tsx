'use client';
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from 'react';
import { getUserProfileData } from "@/services/profile.service";
import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from "@/lib/utils/helperFunctions";
import { ResponseMessage } from '@/lib/utils/dataTypes';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  reason: z.string().min(1),
  cardId: z.string(),
});

export const DeleteForm = ({
  cardId,
  route,
  identifier,
  setIsOpen,
}: {
  cardId: string;
  route: string;
  identifier: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "duplicate",
      cardId: cardId,
    },
  });
  
  const router = useRouter();
  const { toast } = useToast();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      let endpoint = `/${route}/delete`;
      let httpVerb = "PUT";
      let payload = {};

      payload = {
        filterKey: "_id",
        filterValue: cardId,
        userId: user.sub || "",
      };

      const response: ResponseMessage = await httpRequest(
        endpoint,
        payload,
        httpVerb
      );

      if (response) {
        router.refresh();
        toast({
          duration: 2500,
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

      if (response.status === 200) {
        let endpoint = `/audit`;
        let httpVerb = "POST";

        const payload = {
          model: getInitials(route),
          identifier: identifier || "",
          ...values,
          action: "delete",
          userId: user.sub || "",
          createdBy: getInitials(user.name),
        };

        await httpRequest(endpoint, payload, httpVerb);
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
        className="space-y-6  sm:px-0 px-4"
      >
        <FormField
          name="reason"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Reason for delete?</FormLabel>
              <FormControl>
                <Select defaultValue="duplicate">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duplicate">Duplicate</SelectItem>
                    <SelectItem value="no longer needed">
                      No longer needed
                    </SelectItem>
                    <SelectItem value="raised in error">
                      Raised in error
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="w-full hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeleteForm;
