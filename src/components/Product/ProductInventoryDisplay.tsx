import { ProductInventory } from "@/types/productInventory";
import Image from "next/image";


interface ProductInventoryDisplayProps {
  inventory: ProductInventory[];
}

const ProductInventoryDisplay: React.FC<ProductInventoryDisplayProps> = ({
  inventory,
}) => {
  return (
    <div className="space-y-4">
      {inventory.map((product) => (
        <div key={product.id} className="flex items-center border p-4 rounded">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <h3 className="font-bold">{product.title}</h3>
            <p>Quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductInventoryDisplay;
