export interface Item {
  id: string;
  brand?: string;
  description?: string;
  category?: string;
  checkbox: boolean;
  price: number;
  value: number;
  name: string;
  prevPrice: number;
  item: Item;
  reviews?: any;
  images: any;
}

export type selectedImg = {
  image: any;
  color: string;
  colorCode: string;
};

export type cartProductsType = {
  id: string;
  brand?: string;
  description?: string;
  category?: string;
  price: number;
  quantity: number;
  itemTotal: number;
  total?: number;
  name: string;
  image: selectedImg;
};
