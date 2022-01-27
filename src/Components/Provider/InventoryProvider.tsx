import { useContext, useEffect, useReducer } from "react";
import {
  InventoryActionContext,
  InventoryContext,
} from "../../Context/InventoryContext";
import {
  filters,
  inventoryActionType,
  inventoryCases,
  inventoryStateType,
  products,
} from "./InventoryProvider.type";

interface inventoryProviderProps {
  children: React.ReactChild;
}

const initialState = {
  filters: [],
  products: [],
};

const reducer = (state: inventoryStateType, action: inventoryActionType) => {
  switch (action.type) {
    case "fetch": {
      const savedInventory = JSON.parse(localStorage.getItem("inventory")!);
      return savedInventory || state;
    }

    case inventoryCases.ADDFILTER: {
      const newFilter = {
        label: action.payload,
        value: action.payload,
        id: new Date().getTime(),
      };
      return { ...state, filters: [...state.filters, newFilter] };
    }

    case inventoryCases.REMOVEFILTER: {
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.id !== action.payload),
      };
    }

    case inventoryCases.EDITFILTER: {
      const filtersClone = [...state.filters];
      const index = filtersClone.findIndex(
        (filter) => filter.id === action.payload.id
      );
      const selectedFilter = { ...filtersClone[index] };
      selectedFilter.label = action.payload.filter;
      selectedFilter.value = action.payload.filter;
      filtersClone[index] = selectedFilter;
      return { ...state, filters: filtersClone };
    }

    case inventoryCases.ADDPRODUCT: {
        const newProduct = {
            ...action.payload,
            id: new Date().getTime()
        }
        return { ...state, products: [...state.products, newProduct] }
    }

    case inventoryCases.REMOVEPRODUCT: {
        return { ...state, products: state.products.filter(product => product.id !== action.payload) }
    }

    case inventoryCases.EDITPRODUCT: {
      const productsClone = [...state.products];
      const index = productsClone.findIndex(product => product.id === action.payload.id);
      const selectedProduct = {...productsClone[index]};
      selectedProduct.name = action.payload.name;
      selectedProduct.filter = action.payload.filter;
      productsClone[index] = selectedProduct;
      return { ...state, products: productsClone };
    }

    default:
      return state;
  }
};

const InventoryProvider = ({ children }: inventoryProviderProps) => {
  const [inventory, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetch" });
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  return (
    <InventoryContext.Provider value={inventory}>
      <InventoryActionContext.Provider value={dispatch}>
        {children}
      </InventoryActionContext.Provider>
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;

export const useInventory = () => useContext(InventoryContext);

export const useInventoryActions = () => {
  const dispatch = useContext(InventoryActionContext);

  const addFilterHandler = (filter: string) => {
    dispatch({ type: inventoryCases.ADDFILTER, payload: filter });
  };

  const removeFilterHandler = (id: number) => {
    dispatch({ type: inventoryCases.REMOVEFILTER, payload: id });
  };

  const editFilterHandler = (id: number, filter: string) => {
    dispatch({ type: inventoryCases.EDITFILTER, payload: { id, filter } });
  };

  const addProductHandler = (product: { name: string; filter: string }) => {
    dispatch({ type: inventoryCases.ADDPRODUCT, payload: product });
  };

  const removeProductHandler = (id: number) => {
    dispatch({type: inventoryCases.REMOVEPRODUCT, payload: id});
  }

  const editProductHandler = (id: number, product: {name: string, filter: string}) => {
    dispatch({type: inventoryCases.EDITPRODUCT, payload: {...product, id}});
  }

  return {
    addFilterHandler,
    removeFilterHandler,
    editFilterHandler,
    addProductHandler,
    removeProductHandler,
    editProductHandler
  };
};
