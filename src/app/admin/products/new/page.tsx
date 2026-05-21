// app/(admin)/products/new/page.tsx
import { createProduct } from '@/src/actions/productActions';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <Link href="/products" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>
      
      <form action={createProduct} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
          <input type="text" name="name" required className="w-full border p-2 rounded" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Category</label>
            <select name="category" className="w-full border p-2 rounded bg-white">
              <option value="">None specified</option>
              <option value="Phones">Phones</option>
              <option value="Watches">Watches</option>
              <option value="Audio">Audio</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
         
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Condition</label>
            <select name="condition" className="w-full border p-2 rounded bg-white">
              <option value="">None specified</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Price (₪)</label>
            <input type="number" step="0.01" name="price" required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Initial Stock</label>
            <input type="number" name="stock" defaultValue={1} required className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Main Image URL</label>
          <input type="url" name="imageUrl" className="w-full border p-2 rounded" placeholder="https://..." />
          <p className="text-xs text-gray-500 mt-1">Paste a direct link to the image for now.</p>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <label className="block text-gray-700 mb-2 font-medium">Upload Product Images</label>
          <input 
            type="file" 
            name="images" 
            multiple 
            accept="image/*" 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          />
          <p className="text-xs text-gray-500 mt-2">You can select multiple images at once. The first image will be used as the main thumbnail.</p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea name="description" required rows={4} className="w-full border p-2 rounded"></textarea>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input type="checkbox" id="isActive" name="isActive" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          <label htmlFor="isActive" className="text-gray-700 font-medium">Product is active and visible in store</label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors">
          Save Product
        </button>
      </form>
    </div>
  );
}