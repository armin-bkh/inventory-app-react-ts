type setShowType = {
  setShow: () => void;
  show: boolean;
};

type filterType = setShowType & {
  filter: boolean;
  product?: never;
};

type productType = setShowType & {
  product: boolean;
  filter?: never;
};

type showButtonType = filterType | productType;

const ShowButton = ({ setShow, show, product }: showButtonType) => {
  return (
    <button
      type="button"
      className={`block w-full rounded-full py-2 mt-5 ${
        product ? "bg-pink-500 text-white" : "bg-green-600 text-white"
      }`}
      onClick={setShow}
    >
      {!show ? `Add ${product ? "Product" : "Filter"}` : "close"}
    </button>
  );
};

export default ShowButton;
