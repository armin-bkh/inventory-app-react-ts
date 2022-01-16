import { products } from "../Provider/InventoryProvider.type";

export const isExistProduct = (products: products[], product: string) => {
    return products.some(item => item.name.toLowerCase() === product.toLowerCase());
}