import { useInventory } from "../../Provider/InventoryProvider";
import ProductItem from "../ProductItem/ProductItem";

interface productsListProps {
  onEdit: (id: number)=> void;
  onDelete: (name: string, id: number) => void;
}

const ProductsList = ({ onEdit, onDelete }: productsListProps) => {
  const { filters } = useInventory();
  return (
    <section className="p-5 rounded-lg mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {filters.length > 0 &&
        filters.map((filter) => (
          <ProductItem key={filter.id} filter={filter} onEdit={onEdit} onDelete={onDelete} />
        ))}
    </section>
  );
};
export default ProductsList;
