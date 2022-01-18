export type filters = {
  id: number;
  label: string;
  value: string;
};

export type products = {
  id: number;
  name: string;
  filter: string;
};

export interface inventoryStateType {
  filters: filters[];
  products: products[];
}

export interface inventoryActionType {
  type: string;
  payload?: any;
}

export enum inventoryCases {
  ADDFILTER = "ADDFILTER",
  REMOVEFILTER = "REMOVEFILTER",
  ADDPRODUCT = "ADDPRODUCT",
  REMOVEPRODUCT = "REMOVEPRODUCT",
  EDITFILTER = "EDITFILTER",
  EDITPRODUCT = "EDITPRODUCT",
}
