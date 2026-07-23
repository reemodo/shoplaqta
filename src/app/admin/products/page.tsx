// app/(admin)/products/page.tsx
import prisma from '@/src/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <Link 
          href="products/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Category & Condition</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center space-x-3">
                  {/* Quick image thumbnail if available */}
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded bg-gray-100" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                  )}
                  <span className="font-medium text-gray-800">{product.name}</span>
                </td>
                
                <td className="p-4">
                  <div>{product.category}</div>
                  {product.condition && (
                    <div className="text-xs text-gray-500 mt-1">{product.condition}</div>
                  )}
                </td>
                
                <td className="p-4 font-medium">
                  ₪{Decimal(product.price).toFixed(2)}
                </td>
                
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${product.stock === 0 ? 'bg-red-100 text-red-800 font-semibold' : 'text-gray-700'}`}>
                    {product.stock}
                  </span>
                </td>

                <td className="p-4">
                  {product.isActive ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">Draft</span>
                  )}
                </td>
              </tr>
            ))}
            
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No products found. Click "Add Product" to create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}