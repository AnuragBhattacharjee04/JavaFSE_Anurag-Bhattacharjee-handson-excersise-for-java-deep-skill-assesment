
import java.util.Arrays;
import java.util.Comparator;

public class EcommerceSearch {


    static class Product {
        int productId;
        String productName;
        String category;
        double price;

        Product(int productId, String productName, String category, double price) {
            this.productId   = productId;
            this.productName = productName;
            this.category    = category;
            this.price       = price;
        }

        @Override
        public String toString() {
            return String.format("Product{id=%d, name='%s', category='%s', price=%.2f}",
                    productId, productName, category, price);
        }
    }
    static Product linearSearchById(Product[] products, int targetId) {
        for (Product p : products) {
            if (p.productId == targetId) {
                return p;
            }
        }
        return null; // not found
    }

    static Product linearSearchByName(Product[] products, String name) {
        for (Product p : products) {
            if (p.productName.equalsIgnoreCase(name)) {
                return p;
            }
        }
        return null;
    }

    static Product binarySearchById(Product[] sortedProducts, int targetId) {
        int low  = 0;
        int high = sortedProducts.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;           
            int midId = sortedProducts[mid].productId;

            if (midId == targetId) {
                return sortedProducts[mid];              
            } else if (midId < targetId) {
                low = mid + 1;                           
            } else {
                high = mid - 1;                          
            }
        }
        return null; 
    }


    static Product[] sortByProductId(Product[] products) {
        Product[] sorted = Arrays.copyOf(products, products.length);
        Arrays.sort(sorted, Comparator.comparingInt(p -> p.productId));
        return sorted;
    }


    public static void main(String[] args) {
        Product[] catalog = {
            new Product(105, "Wireless Mouse",    "Electronics",   29.99),
            new Product(202, "Notebook",          "Stationery",     4.99),
            new Product(303, "USB-C Hub",         "Electronics",   49.99),
            new Product(101, "Mechanical Keyboard","Electronics",  89.99),
            new Product(404, "Ballpoint Pens",    "Stationery",     3.49),
            new Product(550, "Laptop Stand",      "Accessories",   34.99),
            new Product(221, "Highlighters Set",  "Stationery",     6.99),
        };

        System.out.println("=== E-commerce Product Search ===\n");

        System.out.println("-- Linear Search by Product ID --");
        long start = System.nanoTime();
        Product result = linearSearchById(catalog, 303);
        long end = System.nanoTime();
        System.out.println("Search ID=303 → " + result);
        System.out.println("Time: " + (end - start) + " ns\n");
        System.out.println("-- Linear Search by Name --");
        Product byName = linearSearchByName(catalog, "Laptop Stand");
        System.out.println("Search 'Laptop Stand' → " + byName);
        System.out.println("\n-- Binary Search by Product ID --");
        Product[] sortedCatalog = sortByProductId(catalog);
        System.out.println("Sorted catalog IDs: " +
            Arrays.stream(sortedCatalog).map(p -> String.valueOf(p.productId))
                  .reduce((a, b) -> a + ", " + b).orElse(""));

        start = System.nanoTime();
        Product bResult = binarySearchById(sortedCatalog, 303);
        end   = System.nanoTime();
        System.out.println("Search ID=303 → " + bResult);
        System.out.println("Time: " + (end - start) + " ns\n");
        System.out.println("-- Search for non-existent ID=999 --");
        Product missing = binarySearchById(sortedCatalog, 999);
        System.out.println("Result: " + (missing == null ? "Product not found" : missing));
        System.out.println("\n=== Complexity Analysis ===");
        System.out.println("Linear Search: O(n) time, O(1) space — no sorting required");
        System.out.println("Binary Search: O(log n) time, O(1) space — requires sorted input");
        System.out.println("Recommendation: Use Binary Search for large, sorted catalogs.");
    }
}