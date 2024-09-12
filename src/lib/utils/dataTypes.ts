export type Supplier = {
  _id: string;
  supplierId: string;
  name: string;
  reminders: Reminders;
  containers: Containers;
  activeContainerCount: number;
  enabled: boolean;
};

export type Suppliers = [Supplier];

export type SupplierSummary = {
  count: number;
  suppliers: Suppliers;
};

export type Reminder = {
  _id: string;
  supplier: string;
  reminder: string;
  enabled: boolean;
};

export type Reminders = [Reminder];

export type Comment = {
  _id: string;
  container: string;
  order: string;
  comment: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type Comments = [Comment];

export type Order = {
  _id: string;
  container: string;
  supplier: string;
  orderNumber: string;
  unitCostPrice: number;
  productCode: string;
  customer: string;
  productType: string;
  quantity: number;
  unitWeight: number;
  totalWeight: number;
  ukRequiredDate: string;
  orderPlacedDate: string;
  orderReceivedBySupplier: boolean;
  loaded: boolean;
  sample: string;
  fabricColour: string;
  artworkDrawings: string;
  printOnBag: string;
  artworkSaved: string;
  comments: Comments;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type Orders = [Order];

export type Container = {
  _id: string;
  supplier: string;
  supplierContainerNumber: string;
  complete: boolean;
  orders: Orders;
  value: number;
  addedToShippingForecast: boolean;
  full: boolean;
  shippingContainerNumber: string;
  vesselName: string;
  shippingRoute: string;
  destinationPort: string;
  stuffingDate: Date;
  sailingDate: Date;
  etaUKPort: Date;
  bookedInDate: Date;
  bookedInSlot: [];
  copyDocsReceived: string;
  plasticTaxDocsReceived: string;
  docsToFinance: string;
  contListSaved: string;
  comments: Comments;
};

export type Containers = [Container];

export type ContainersList = {
  count: number;
  containers: Containers;
};

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type ResponseMessage = {
  status: number;
  title: string;
  message: string;
};

export type PublicSettings = {
  appSettings: [
    {
      companyName: string;
    }
  ];
  status: number;
};

export type AppSetting = {
  companyName: string;
  defaultLeadTime: number;
  defaultProductionTime: number;
};

export type AppSettings = {
  appSettings: [
    {
      companyName: string;
      defaultLeadTime: number;
      defaultProductionTime: number;
    }
  ];
  status: number;
};

export type Audit = {
  _id: string;
  model: string;
  identifier: string;
  action: string;
  reason: string;
  userId: string;
  createdBy: string;
  createdAt: string;
};

export type Audits = [Audit];

//Person is a test export type
export type Person = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
};
