

export async function fetchOneProduct(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}
