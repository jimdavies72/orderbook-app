"use client";
import { DataTable } from "@/components/audit/data-table";
import { getUserProfileData } from "@/services/profile.service";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { getInitials } from "@/lib/utils/helperFunctions";
import { ResponseMessage, AppSetting, Audits } from "@/lib/utils/dataTypes";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  companyName: z.string().min(5),
});

export const AppSettingsComponent = ({
  appSettingData,
  auditData,
  appId,
}: {
  appSettingData?: AppSetting,
  auditData: Audits,
  appId?: string | ""
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: appSettingData?.companyName || "Enter name here"
    },
  });

  const { toast } = useToast();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();
      let endpoint = `/appsetting/update`;
      let httpVerb = "PUT";
      let payload = {};

      payload = {
        appId: appId,
        data: {
          companyName: values.companyName,
        }
      };

      const response: ResponseMessage = await httpRequest(
        endpoint,
        payload,
        httpVerb,
        { next: {tags: ['appsettings', '@navbar']}}
      );

      if (response) {
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
          model: "AppSettings",
          identifier: values.companyName,
          reason: "update values",
          action: "update",
          userId: user.sub || "",
          createdBy: getInitials(user.name),
        };

        await httpRequest(
          endpoint, 
          payload, 
          httpVerb, 
          {next: { tags: ["audit"] }
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs defaultValue="settings" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-2 gap-4">
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="audit">Audit</TabsTrigger>
      </TabsList>
      <TabsContent value="settings">
        <Card className="shadow-md shadow-gray-500">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6 sm:px-0 px-4"
            >
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
                <CardDescription>
                  Make changes to your app settings here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <FormField
                    name="companyName"
                    control={form.control}
                    render={({ field }: { field: any }) => (
                      <FormItem className="col-span-2 md:col-span-1 w-[50%]">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Company Name"
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
              </CardContent>
              <CardFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
      <TabsContent value="audit">
        <Card>
          <CardHeader>
            <CardTitle>Audit</CardTitle>
            <CardDescription>Review app audit actions here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DataTable data={auditData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AppSettingsComponent;
