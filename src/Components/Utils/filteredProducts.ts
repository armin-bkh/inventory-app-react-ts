import { products } from "../Provider/InventoryProvider.type"

export const filteredProducts = (list: products[], filter: string) => {
    return list.filter(item => item.filter.toLowerCase() === filter.toLowerCase());
}