import { useEffect, useReducer } from "react"
import { InventoryActionContext, InventoryContext } from "../../Context/InventoryContext"

interface inventoryProviderProps {
    children: React.ReactChild
}

interface inventoryStateType {
    filters: {}[],
    products: {}[]
}

interface inventoryActionType {
    type: string,
    payload?: any
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
        <InventoryContext.Provider value={null}>
            <InventoryActionContext.Provider value={null}>
                {children}
            </InventoryActionContext.Provider>
        </InventoryContext.Provider>
    )
}

export default InventoryProvider;