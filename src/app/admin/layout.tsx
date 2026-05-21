import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Laqta Manager</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/products" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700">
            Products & Sales
          </Link>
          <Link href="/orders" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700">
            Order Fulfillment
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}