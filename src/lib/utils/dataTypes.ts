type Supplier = {
  _id: string,
  supplierId: string,
  name: string,
  activeContainerCount: number,
  enabled: boolean
};

type Suppliers = [
  Supplier, 
]

type SupplierSummary = {
  count: number,
  suppliers: Suppliers
};

type Comment = {
  _id: string,
  container: object,
  order: object,
  comment: string,
  createdBy: string,
  createdAt: string,
  updatedBy: string,
  updatedAt: string
}

type Comments = [
  Comment
]

type Order = {
  _id: string,
  container: object,
  supplier: object,
  orderNumber: string,
  forPurchasing: number,
  productCode: string,
  customer: string,
  productType: string,
  quantity: number,
  unitWeight: number,
  totleWeight: number,
  ukRequiredDate: string,
  orderPlacedDate: string,
  orderReceived: boolean,
  loaded: boolean,
  sample: string,
  fabricColour: string,
  artworkDrawings: string,
  printOnBag: string,
  artworkSaved: string,
  comments: Comments,
  createdBy: string,
  updatedBy: string
}

type Orders = [
  Order
]

type Container = {
  _id: string,
  containerId: string,
  complete: boolean,
  orders: Orders,
  value: number,
  full: boolean,
  containerNumber: string,
  vesselDetails: string,
  stuffingDate: string,
  etaUKPort: string,
  bookedIn: string,
  copyDocsRec: string,
  plasticTaxDocsRec: string,
  docsToMe: string,
  contListSaved: string,
  comments: Comments,
};

type Containers = [
  Container
];

type ContainersList = {
    count: number,
    containers: Containers
};

type ErrorProps = {
  error: Error,
  reset: () => void;
};

type ResponseMessage = {
  title: string,
  message: string
};

//Person is a test type
type Person = {
  id: string,
  name: string,
  role: string,
  description: string,
  image: string
};

export type { SupplierSummary, ContainersList, Suppliers, Supplier, Containers, Container, Orders, Order, Comments, Comment, ErrorProps, ResponseMessage, Person };