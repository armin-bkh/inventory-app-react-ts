import React, { createContext } from "react";
import { inventoryActionType, inventoryStateType } from "../Components/Provider/InventoryProvider.type";

export const InventoryContext = createContext<inventoryStateType>(null!);
export const InventoryActionContext = createContext<React.Dispatch<inventoryActionType>>(null!);