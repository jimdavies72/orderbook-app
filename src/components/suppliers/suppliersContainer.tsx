'use client'
// Supplier Maintenance Page Container

import { useState, useEffect } from "react";
import { Suppliers, Supplier, Reminders } from "@/lib/utils/dataTypes";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DataTable as SuppliersDataTable } from "@/app/suppliers/_components/data-table";
import { DataTable as ReminderDataTable } from "@/components/reminders/data-table";

const SuppliersContainer = ({ 
  supplierData,
}: { 
  supplierData: Suppliers,
}) => {
  const [supplierId, setSupplierId] = useState<string>("");
  const [reminderData, setReminderData] = useState<Reminders>([{}] as Reminders);
  const [bool, setBool] = useState<boolean>(false);

  useEffect(() => {
    if (supplierId !== "") {
      reminderHandler(supplierId);
    }
  }, [supplierData]);

  const reminderHandler = async (supplierId: string) => {
    setSupplierId(supplierId);

    const result: Supplier | undefined = supplierData.find(
      (supplier) => {
        return supplier._id === supplierId;
      }
    );

    if (result){
      setReminderData(result.reminders)
      setBool(true);
    } else {
      setReminderData([] as any);
      setBool(false);
    }

  };

  return (
    <div className="w-full container mx-auto">
      <Link
        href="/"
        className="mb-6 flex flex-row items-center space-x-1 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 duration-200 transition-all"
        />
        <span>Back</span>
      </Link>
      <div className="flex items-top justify-center gap-4">
        <SuppliersDataTable
          data={supplierData}
          reminderHandler={reminderHandler}
        />
        <ReminderDataTable
          data={reminderData}
          showAddButton={bool}
          supplierId={supplierId}
        />

      </div>
    </div>
  );
};

export default SuppliersContainer;
