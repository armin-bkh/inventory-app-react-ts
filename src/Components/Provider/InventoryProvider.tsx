import { useEffect, useReducer } from "react"
import { InventoryActionContext, InventoryContext } from "../../Context/InventoryContext"
import { inventoryActionType, inventoryStateType } from "./InventoryProvider.type"

interface inventoryProviderProps {
    children: React.ReactChild
}

const initialState = {
    filters: [],
    products: []
}

const reducer = (state: inventoryStateType, action: inventoryActionType) => {
    switch(action.type){
        case "fetch": {
            const savedInventory = JSON.parse(localStorage.getItem('inventory')!);
            return savedInventory || state;
        }
    }
}

const InventoryProvider = ({ children }: inventoryProviderProps) => {
    const [inventory, dispatch] = useReducer(reducer, initialState);

    useEffect(()=> {
        dispatch({type: "fetch"})
    }, [])

    return (
        <InventoryContext.Provider value={inventory}>
            <InventoryActionContext.Provider value={dispatch}>
                {children}
            </InventoryActionContext.Provider>
        </InventoryContext.Provider>
    )
}

export default InventoryProvider;