// app/actions/orderActions.ts
'use server'

import prisma from '@/src/lib/prisma'; // Adjust path if needed
import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@prisma/client';

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  });
  
  // Refresh the orders page immediately
  revalidatePath('/orders'); 
}