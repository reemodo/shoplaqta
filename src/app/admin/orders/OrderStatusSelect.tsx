// app/(admin)/orders/OrderStatusSelect.tsx
'use client'

import { useTransition } from 'react';
import { updateOrderStatus } from '@/src/actions/orderActions';
import { OrderStatus } from '@prisma/client';

export default function OrderStatusSelect({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string, 
  currentStatus: OrderStatus 
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    startTransition(() => {
      updateOrderStatus(orderId, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={handleStatusChange}
      className={`border p-2 rounded text-sm font-semibold ${
        isPending ? 'opacity-50' : ''
      } ${
        currentStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
        currentStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
        currentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
        'bg-blue-100 text-blue-800'
      }`}
    >
      <option value="PENDING">Pending</option>
      <option value="PROCESSING">Processing</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  );
}