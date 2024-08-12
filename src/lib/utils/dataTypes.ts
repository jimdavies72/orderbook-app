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
  container: object,
  order: object,
  comment: string
}

type Comments = [
  Comment
]

type Order = {
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
  comments: Comments
}

type Orders = [
  Order
]

type Container = {
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

type SuppliersDetail = {
    supplier: Supplier,
    containers: Containers
};

type SupplierFull = {
  count: number;
  suppliers: SuppliersDetail;
  // filter: (
  //   predicate: (value: any, index: number, array: SupplierFull[]) => boolean
  // ) => SupplierFull[];
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

export type { SupplierFull, SupplierSummary, SuppliersDetail, Suppliers, Supplier, Containers, Container, Orders, Order, ErrorProps, ResponseMessage, Person };