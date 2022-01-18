import { products } from "../Provider/InventoryProvider.type";

export const isExistProduct = (productList: products[], product: string) => {
    return productList.some(item => item.name.toLowerCase() === product.toLowerCase());
}