'use client';
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from 'react';
import { getUserProfileData } from "@/services/profile.service";
import { httpRequest } from '@/lib/utils/dataHelpers';
import { ResponseMessage } from '@/lib/utils/dataTypes';

import { Button } from '@/components/ui/button';
import IconMenu from "../icon-menu";
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  cardId: z.string(),
});

export const DeleteForm = ({
  cardId,
  route,
  setIsOpen,
}: {
  cardId: string;
  route: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardId: cardId,
    },
  });
  const router = useRouter();
   const { toast } = useToast();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
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
