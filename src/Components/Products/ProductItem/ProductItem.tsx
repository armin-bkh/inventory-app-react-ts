import { useInventory, useInventoryActions } from "../../Provider/InventoryProvider";
import { filters } from "../../Provider/InventoryProvider.type";
import { filteredProducts } from "../../Utils/filteredProducts";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";

interface productItemProps {
  filter: filters;
}

const ProductItem = ({ filter }: productItemProps) => {
  const { products } = useInventory();
//   const {  } = useInventoryActions();

  return (
    <div
      className={`bg-pink-400 py-2 px-3 flex flex-col justify-center items-center rounded-md shadow-md shadow-pink-400/50`}
    >
      <p className="text-white">{filter.label}</p>
      {filteredProducts(products, filter.value).length ? (
        <ul className="w-full">
          {filteredProducts(products, filter.value).map((product) => (
            <li className="flex items-center justify-between" key={product.id}>
              {product.name}
              <div>
                <button type="button" className="text-yellow-400 text-xl mr-3">
                  <AiFillEdit />
                </button>
                <button onClick={onDelete} type="button" className="text-red-800 text-xl">
                  <AiTwotoneDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>empty</p>
      )}
    </div>
  );
};

export default ProductItem;
