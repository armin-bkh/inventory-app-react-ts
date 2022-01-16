import { ToastProvider } from "react-toast-notifications";
import Filters from "./Components/Filters/Filters";
import InventoryProvider from "./Components/Provider/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <ToastProvider autoDismiss placement="top-right" newestOnTop>
        <main className="p-5">
          <Filters />
        </main>
      </ToastProvider>
    </InventoryProvider>
  );
}

export default App;
