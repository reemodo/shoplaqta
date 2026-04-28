import prisma from "@/src/lib/prisma";
import ProductCard from "@/src/components/ProductCard";
import { Prisma } from "@prisma/client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>; 
}) {
  const params = await searchParams;
  const searchString = params.category;

  // 1. Create a smart filter based on your 4 exact categories
  let dbFilter: Prisma.ProductWhereInput | undefined = undefined;
  if (searchString === "New Phones") {
    dbFilter = { 
      category: "Phones", 
      condition: { equals: "New", mode: "insensitive" } 
    };
  
  } else if (searchString === "Used Phones" || searchString === "Used") {
    dbFilter = { 
      category: "Phones", 
      condition: { contains: "Used", mode: "insensitive" } 
    };
  } else if (searchString === "Accessories" ) {
    // This tells the database to grab anything in these categories
    dbFilter = { 
      category: { in: ["Watches", "Audio", "Accessories"] } 
    };
  }else if (searchString === "Watches" ) {
    // This tells the database to grab anything in these categories
    dbFilter = { 
      category: "Watches"
    };
  }else if (searchString === "Audio" ) {
    // This tells the database to grab anything in these categories
    dbFilter = { 
      category: "Audio"
    };
  }

  // 2. Fetch products using our smart filter
  const products = await prisma.product.findMany({
    where: dbFilter, 
    orderBy: [{
      stock: 'desc', // Items with stock appear first
    },
    {
      createdAt: 'desc', // Then sort by newest
    }
  ]
  });

  return (
    <div className="min-h-screen bg-white pt-8 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black font-outfit tracking-tight">
            {searchString ? `${searchString}` : "All Products"}
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            {products.length} {products.length === 1 ? "item" : "items"} found in Laqta Shop.
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-[#fbfbfd] rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">We are currently restocking this category. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{
                  ...product,
                  price: Number(product.price)
                }} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}