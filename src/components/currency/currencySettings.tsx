'use client';
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';

import { httpRequest } from '@/lib/utils/dataHelpers';
import { getInitials } from '@/lib/utils/helperFunctions';
import { getUserProfileData } from "@/services/profile.service";

import {
  CurrencyArray,
  CurrencyListData,
  ResponseMessage,
} from "@/lib/utils/dataTypes";

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MultiSelect } from "@/components/multi-select";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  baseCurrencyDefault: z.string(),
  currenciesUsed: z.array(z.object({ code: z.string(), name: z.string(), symbol: z.string() })),
  updatedBy: z.string(),
});

const data = [
  {
    value: "USD",
    label: "US Dollar",
  },
  {
    value: "EUR",
    label: "Euro",
  },
  {
    value: "GBP",
    label: "Pound Sterling",
  },
];

interface ICurrencyDisplayObject {
  value: string;
  label: string;
}

const CurrencySettings = ({
  currencyData,
}:{
  currencyData: CurrencyListData
}) => {
  const [currencySourceList, setCurrencySourceList] = useState<[ICurrencyDisplayObject]>([{} as ICurrencyDisplayObject]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyArray>();
  const router = useRouter();
  const { toast } = useToast();

  console.log(currencyData.)

  useEffect(() => {
    let arr: [ICurrencyDisplayObject] = [{} as ICurrencyDisplayObject];
    if(currencyData.currencyList.length > 0){
      currencyData.currencyList.map((c: any) => {
        arr.push({value: c.code, label: `${c.name} (${c.code})`})
      });

      setCurrencySourceList(arr);
    }

  }, [currencyData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseCurrencyDefault: currencyData.baseCurrencyDefault || "",   
      currenciesUsed: currencyData.currenciesUsed || [],
      updatedBy: currencyData.updatedBy
    },
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await getUserProfileData();

      const endpoint = "/currency/update";
      const httpVerb = "PUT";
      const payload = {
        id: currencyData._id,
        data: {
          baseCurrencyDefault: values.baseCurrencyDefault,
          currenciesUsed: values.currenciesUsed,
          updatedBy: getInitials(user.name),
        }
      };

      const response: ResponseMessage = await httpRequest(
        endpoint,
        payload,
        httpVerb
      );
      if (response) {
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

      router.refresh();

    } catch (error) {
      console.log(error);
    }
    
  }

  const currenciesHandler = (value: any) => {
    const selectedData = currencyData.currencyList.filter((item: any) => value.includes(item.value));

    console.log(selectedData)
    //setSelectedCurrencies(selectedData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
        autoComplete="off"
      >
        <FormField
          name="currenciesUsed"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1 w-80">
              <FormLabel>Select Currencies</FormLabel>
              <FormControl>
                <MultiSelect
                  className="w-max"
                  options={data}
                  onValueChange={(value) => {
                    field.onChange(value);
                    currenciesHandler(value);
                  }}
                  defaultValue={field.value}
                  placeholder="Select currencies"
                  variant="inverted"
                  animation={0}
                  maxCount={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="baseCurrencyDefault"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Default Base Currency</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[200px] font-bold">
                    <SelectValue {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCurrencies ? (
                      selectedCurrencies.map(
                        (currency: any, index: number) => (
                          <SelectItem
                            className="font-bold"
                            key={index}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        )
                      )
                    ) : (
                      <p>No Currencies</p>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="mt-8" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CurrencySettings;
