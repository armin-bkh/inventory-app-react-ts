import { ToastProvider } from "react-toast-notifications";
import InventoryProvider from "./Components/Provider/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <ToastProvider>inventory-app</ToastProvider>
    </InventoryProvider>
  );
}

export default App;
