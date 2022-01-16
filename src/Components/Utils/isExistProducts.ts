import { products } from "../Provider/InventoryProvider.type";

export const isExistProducts = (products: products[], product: string) => {
    return products.some(item => item.name.toLowerCase() === product.toLowerCase());
}