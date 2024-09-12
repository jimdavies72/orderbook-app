"use client";
import { useRouter } from "next/navigation";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { getInitials } from "@/lib/utils/helperFunctions";
import React, {
  Dispatch,
  SetStateAction,
} from "react";
import { Reminder, ResponseMessage } from "@/lib/utils/dataTypes";
import { getUserProfileData } from "@/services/profile.service";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  reminder: z.string().min(1),
  enabled: z.boolean(),
});

export const EditForm = ({
  supplier,
  setIsOpen,
  reminderRow,
}: {
  supplier: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  reminderRow?: Reminder | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reminder: reminderRow?.reminder || "",
      enabled: reminderRow?.enabled || true,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      const inits: string = getInitials(user.name);

      // default is assumed to be edit doc route
      let endpoint = "/reminders/update";
      let httpVerb = "PUT";
      let payload = {};

      payload = {
        filterKey: "_id",
        filterValue: reminderRow?._id,
        data: {
          ...values,
          updatedBy: inits,
        },
      };

      // come via the add doc route
      if (!reminderRow) {
        endpoint = "/reminders";
        httpVerb = "POST";
        payload = {
          supplier: supplier,
          ...values,
          userId: user.sub,
          createdBy: inits,
          updatedBy: inits,
        };
      }

      const response: ResponseMessage = await httpRequest(
        endpoint,
        payload,
        httpVerb,
        null,
        false
      );

      if (response) {
        toast({
          duration: 2000,
          title: response.title,
          description: response.message,
        });
      } else {
        toast({
          duration: 2500,
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
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="enabled"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1 align-middle">
              <FormLabel htmlFor="enabled" className="mr-2">Enabled:</FormLabel>
              <FormControl>
                <Switch
                  {...field}
                  id="enabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="reminder"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Reminder</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter reminder here"
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
