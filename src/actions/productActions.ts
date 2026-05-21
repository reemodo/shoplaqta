// app/actions/productActions.ts
'use server'

import prisma from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const category = formData.get('category') as string;
  const condition = formData.get('condition') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const isActive = formData.get('isActive') === 'on'; 

  const imageFiles = formData.getAll('images') as File[];
  const uploadedUrls: string[] = [];

  for (const file of imageFiles) {
    if (file.size > 0) {
      // Convert the file to a Base64 string for Cloudinary
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      const fileUri = `data:${file.type};base64,${base64Data}`;

      // Upload to a specific folder in Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(fileUri, {
        folder: 'laqta_shop/products',
      });

      uploadedUrls.push(uploadResponse.secure_url);
    }
  }
  const mainImageUrl = uploadedUrls.length > 0 ? uploadedUrls[0] : null;
  await prisma.product.create({
    data: {
      name,
      description,
      price, 
      stock,
      category,
      condition: condition || null,
      imageUrl: mainImageUrl, // Save the first image as the main thumbnail
      images: uploadedUrls,   // Save the full array of URLs
      isActive,
    },
  });
  

  revalidatePath('/products');
  redirect('/products');
}