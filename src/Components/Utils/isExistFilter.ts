import { filters } from "../Provider/InventoryProvider.type"

export const isExistFilter = (filters: filters[], filter: string) => {
    return filters.some(item => item.value.toLowerCase() === filter.toLowerCase())
}