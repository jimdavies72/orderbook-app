import {
  FileX,
  PencilLine,
  Building,
  Cog,
  Container as LucideContainer,
  MessageSquareQuote,
  BadgeDollarSign,
} from "lucide-react";

export const actions = [
  {
    label: "Delete",
    value: "delete",
    icon: FileX,
  },
  {
    label: "Update",
    value: "update",
    icon: PencilLine,
  },
];

export const models = [
  {
    label: "App Settings",
    value: "AppSettings",
    icon: Cog,
  },
  {
    label: "Supplier",
    value: "Supplier",
    icon: Building,
  },
  {
    label: "Container",
    value: "Container",
    icon: LucideContainer,
  },
  {
    label: "Order",
    value: "Order",
    icon: BadgeDollarSign,
  },
  {
    label: "Comment",
    value: "Comment",
    icon: MessageSquareQuote,
  },
];