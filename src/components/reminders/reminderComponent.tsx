'use client'
import { useState, useEffect } from "react";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { Reminders, Reminder } from "@/lib/utils/dataTypes";
import SuchEmpty from "../suchEmpty";
import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

interface IRemindersResponse {
  reminders: Reminders,
  status: number
}

const ReminderComponent = ({
  supplierId,
}: {
  supplierId: string;
}) => {
  const [reminders, setReminders] = useState<Reminders | undefined>();

  const getReminders = async () => {

    const response: IRemindersResponse = await httpRequest(
      "/reminders",
      {
        includeDisabled: false,
        filterKey: "supplier",
        filterValue: supplierId,
      },
      "PATCH",
      { cache: "no-store" }
    );

    if (response.reminders.length > 0) {
      setReminders(response.reminders);
    } else {
      setReminders(undefined);
    };
  };

  useEffect(() => {
    if (supplierId !== "") {
      getReminders();
    }
  }, [supplierId]);

  return (
    <div className=" pl-4 pr-4 ml-6 mr-6 mb-3 rounded-b-lg border shadow-md shadow-gray-500 ">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p>Reminders</p>
          </AccordionTrigger>
          <AccordionContent className="flex justify-center items-center">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 8000,
                  stopOnInteraction: true,
                }),
              ]}
              opts={{
                align: "start",
              }}
              orientation="horizontal"
              className=" w-full max-w-[90%]"
            >
              <CarouselContent className=" text-2xl font-extrabold">
                {reminders ? (
                  reminders.map((reminder: Reminder, index) => (
                    <CarouselItem
                      key={index}
                      className=" border-gray-800 flex w-[100%] max-w-[100%] justify-center items-center"
                    >
                      {reminder.reminder}
                    </CarouselItem>
                  ))
                ) : (
                  <div className=" w-[100%] max-w-[100%] flex justify-center items-center">
                    <SuchEmpty hasBorder={false} />
                  </div>
                )}
              </CarouselContent>
              {reminders ? (
                <div>
                  <CarouselDots />
                  <CarouselPrevious className=" bg-slate-300 font-bold shadow-md shadow-gray-500" />
                  <CarouselNext className=" bg-slate-300 font-bold shadow-md shadow-gray-500" />
                </div>
              ) : null}
            </Carousel>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReminderComponent;
