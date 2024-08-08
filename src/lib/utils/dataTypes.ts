type Supplier = {
  _id: string,
  supplierId: string,
  name: string,
  activeContainerCount: number,
  enabled: boolean
};

type Suppliers = [
  Supplier
]

type SupplierSummary = {
  count: number,
  suppliers: Suppliers
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

export type { SupplierSummary, Suppliers, Supplier, ErrorProps, ResponseMessage, Person };