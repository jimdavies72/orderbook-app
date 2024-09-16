"use client";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { ResponseMessage, AppSetting, Audits, CurrencyListData } from "@/lib/utils/dataTypes";
import { getUserProfileData } from "@/services/profile.service";
import { getInitials } from "@/lib/utils/helperFunctions";
import { DataTable } from "@/components/audit/data-table";

import CurrencySettings from "../currency/currencySettings";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  companyName: z.string().min(5),
  defaultLeadTime: z.coerce.number().min(1).default(12),
  defaultProductionTime: z.coerce.number().min(1).default(7),
});

export const AppSettingsComponent = ({
  appSettingData,
  auditData,
  currencyData,
  appId,
}: {
  appSettingData?: AppSetting,
  auditData: Audits,
  currencyData: CurrencyListData,
  appId?: string | ""
}) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: appSettingData?.companyName || "Enter name here",
      defaultLeadTime: appSettingData?.defaultLeadTime || 0,
      defaultProductionTime: appSettingData?.defaultProductionTime || 0,
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
          defaultLeadTime: values.defaultLeadTime,
          defaultProductionTime: values.defaultProductionTime,
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
          identifier: Object.keys(form.formState.dirtyFields).join(", "),
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
    <Tabs defaultValue="settings" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-3 gap-4 mb-3">
        <TabsTrigger
          className="shadow-md shadow-slate-500" value="settings">
          Settings
        </TabsTrigger>
        <TabsTrigger className="shadow-md shadow-slate-500" value="audit">
          Audit
        </TabsTrigger>
        <TabsTrigger className="shadow-md shadow-slate-500"value="currencies">
          Currencies
        </TabsTrigger>
      </TabsList>
      <TabsContent value="settings">
        <Card className="shadow-md shadow-gray-500">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6 sm:px-0 px-4"
              autoComplete="off"
            >
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
                <CardDescription>
                  Make changes to your app settings here. Click save when you're
                  done
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 flex flex-col">
                  <FormField
                    name="companyName"
                    control={form.control}
                    render={({ field }: { field: any }) => (
                      <FormItem className=" w-[50%]">
                        <FormLabel className="font-semibold">
                          Company Name
                        </FormLabel>
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
                  <div className="flex flex-row items-center justify-start gap-4">
                    <FormField
                      name="defaultLeadTime"
                      control={form.control}
                      render={({ field }: { field: any }) => (
                        <FormItem className="col-span-1 md:col-span-1 w-[25%]">
                          <FormLabel className="font-semibold">
                            Default Lead Time
                          </FormLabel>
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
                    <FormField
                      name="defaultProductionTime"
                      control={form.control}
                      render={({ field }: { field: any }) => (
                        <FormItem className="col-span-1 md:col-span-1 w-[25%]">
                          <FormLabel className="font-semibold">
                            Default Production Time
                          </FormLabel>
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
                  </div>
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
        <Card className="shadow-md shadow-gray-500">
          <CardHeader>
            <CardTitle>Audit</CardTitle>
            <CardDescription>Review app audit actions here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DataTable data={auditData} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="currencies">
        <Card className="shadow-md shadow-gray-500">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Adjust your application currencies here
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-2">
            <CurrencySettings currencyData={currencyData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AppSettingsComponent;
