import { ToastProvider } from "react-toast-notifications";
import Filters from "./Components/Filters/Filters";
import InventoryProvider from "./Components/Provider/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <ToastProvider>
        <Filters />
      </ToastProvider>
    </InventoryProvider>
  );
}

export default App;
