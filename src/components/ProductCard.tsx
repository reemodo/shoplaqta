"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore"; // 2. Import the store
import { ShoppingCart } from "lucide-react"; // Optional: Add an icon
// We define what a "Product" looks like based on your database schema
type ProductProps = {
  id: string;
  name: string;
  price: number;
  condition: string | null;
  imageUrl: string | null;
  category: string;
};

export default function ProductCard({ product }: { product: ProductProps }) {
   const addItem = useCartStore((state) => state.addItem);
   const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Stops the Link from navigating away
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    // Optional: You could trigger a little "Added!" toast notification here later
  };
return (
    <Link href={`/products/${product.id}`} className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative w-full h-64 bg-[#fbfbfd] p-6 flex items-center justify-center">
        {/* We use a fallback image if the product doesn't have one yet */}
        <Image 
          src={product.imageUrl || "/media/hero-phone.jpg"} 
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Condition Badge (e.g., "Used - Like New") */}
        {product.condition && (
          <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-700">
            {product.condition}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-black font-outfit mb-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-black">
            ₪{Number(product.price).toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 text-sm font-semibold text-laqta bg-blue-50 px-4 py-2 rounded-full hover:bg-laqta hover:text-white transition-colors z-10 relative"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}