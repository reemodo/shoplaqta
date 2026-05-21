// app/(admin)/orders/page.tsx
import prisma from '@/src/lib/prisma';
import OrderStatusSelect from './OrderStatusSelect';

export default async function OrdersPage() {
  // Fetch orders with their related items and pickup slots
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true, // Includes product name/details
        }
      },
      pickupSlot: true, // Includes pickup info if applicable
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Fulfillment</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Order ID / Date</th>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Items</th>
              <th className="p-4 font-semibold text-gray-600">Total</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 align-top">
                
                {/* ID & Date */}
                <td className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{order.id.slice(0, 8)}...</div>
                  <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                  {order.pickupSlot && (
                    <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Pickup: {order.pickupSlot.locationName}
                    </span>
                  )}
                </td>

                {/* Customer Details */}
                <td className="p-4">
                  <div className="font-semibold">{order.customerName}</div>
                  <div className="text-sm text-gray-600">{order.customerPhone}</div>
                  <div className="text-sm text-gray-500">{order.city}, {order.street}</div>
                  {order.notes && (
                    <div className="mt-1 text-xs text-orange-600 bg-orange-50 p-1 rounded">
                      Note: {order.notes}
                    </div>
                  )}
                </td>

                {/* Items List */}
                <td className="p-4">
                  <ul className="text-sm space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity}x {item.product.name} 
                      </li>
                    ))}
                  </ul>
                </td>

                {/* Total Amount (handling Prisma Decimal) */}
                <td className="p-4 font-semibold">
                  ₪{Number(order.totalAmount).toFixed(2)}
                </td>

                {/* Status Interactive Dropdown */}
                <td className="p-4">
                  <OrderStatusSelect 
                    orderId={order.id} 
                    currentStatus={order.status} 
                  />
                </td>

              </tr>
            ))}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}