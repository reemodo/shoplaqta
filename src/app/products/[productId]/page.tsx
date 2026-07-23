import prisma from "@/src/lib/prisma";
import Image from "next/image";
import { ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import AddToCartButton from "@/src/components/AddToCartButton"; // Import the client button
import ProductGallery from "@/src/components/ProductGallery";
import { Decimal } from "@prisma/client/runtime/library";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400">
        <a href="/" className="hover:text-black transition-colors">Store</a>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium capitalize">{product.category}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 pb-20">
        {/* Left: Gallery */}
          <ProductGallery images={product.images} name={product.name} />


        {/* Right: Info */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="sticky top-24 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                {product.condition || "New Arrival"}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{product.name}</h1>
              <p className="text-3xl font-light text-gray-900">₪{Decimal(product.price).toFixed(2)}</p>
            </div>

            <div className="h-px bg-gray-100 w-full" />
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">About this item</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span className="text-sm font-bold">1 Year Warranty</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-2">
                <Truck className="text-blue-600" size={20} />
                <span className="text-sm font-bold">Fast Delivery</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {/* USE THE CLIENT COMPONENT HERE */}
              <AddToCartButton product={product} />
              
              <p className="text-center text-xs text-gray-400 font-medium">
                {product.stock > 0 ? `In Stock (${product.stock} units)` : "Currently Unavailable"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
