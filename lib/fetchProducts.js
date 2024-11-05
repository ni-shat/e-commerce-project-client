

export async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // Return only the first 20 products
        return data.products.slice(0, 20);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
