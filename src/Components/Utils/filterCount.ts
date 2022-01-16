import { products } from '../Provider/InventoryProvider.type';

export const filterCount = (products: products[], filter: string) => {
    return products.filter(product => product.filter.toLowerCase() === filter.toLowerCase()).length
}