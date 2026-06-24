
public class FinancialForecasting {

    static double futureValueRecursive(double presentValue, double annualRate, int years) {
        // Base case: no more years to compound
        if (years == 0) {
            return presentValue;
        }
        return futureValueRecursive(presentValue * (1 + annualRate), annualRate, years - 1);
    }
    static double futureValueIterative(double presentValue, double annualRate, int years) {
        double fv = presentValue;
        for (int i = 0; i < years; i++) {
            fv *= (1 + annualRate);
        }
        return fv;
    }

    static java.util.Map<String, Double> memo = new java.util.HashMap<>();

    static double futureValueMemo(double pv, double rate, int years) {
        if (years == 0) return pv;
        String key = pv + ":" + rate + ":" + years;
        if (memo.containsKey(key)) return memo.get(key);
        double result = futureValueMemo(pv * (1 + rate), rate, years - 1);
        memo.put(key, result);
        return result;
    }

    static double monthlyCompoundRecursive(double pv, double annualRate, int months) {
        if (months == 0) return pv;
        double monthlyRate = annualRate / 12;
        return monthlyCompoundRecursive(pv * (1 + monthlyRate), annualRate, months - 1);
    }


    static void printGrowthTable(double pv, double rate, int years) {
        System.out.println("\nYear | Future Value");
        System.out.println("-----|-------------");
        for (int y = 0; y <= years; y++) {
            double fv = futureValueRecursive(pv, rate, y);
            System.out.printf("%4d | $%,.2f%n", y, fv);
        }
    }


    public static void main(String[] args) {
        System.out.println("=== Financial Forecasting Tool ===\n");

        double principal    = 10_000.0;   // $10,000 initial investment
        double annualRate   = 0.08;       // 8% annual interest
        int    years        = 10;

        
        double fvRecursive = futureValueRecursive(principal, annualRate, years);
        System.out.printf("Recursive  FV (%.0f%% for %d yrs): $%,.2f%n",
                annualRate * 100, years, fvRecursive);

        
        double fvIterative = futureValueIterative(principal, annualRate, years);
        System.out.printf("Iterative  FV (%.0f%% for %d yrs): $%,.2f%n",
                annualRate * 100, years, fvIterative);

        
        double fvMemo = futureValueMemo(principal, annualRate, years);
        System.out.printf("Memoized   FV (%.0f%% for %d yrs): $%,.2f%n",
                annualRate * 100, years, fvMemo);

        
        double fvMonthly = monthlyCompoundRecursive(principal, annualRate, years * 12);
        System.out.printf("Monthly Compound FV (10 yrs)  : $%,.2f%n", fvMonthly);

        
        System.out.println("\n--- Growth Table ($10,000 at 8% annually) ---");
        printGrowthTable(principal, annualRate, years);

        
        System.out.println("\n--- Rate Comparison at 10 years ---");
        double[] rates = {0.05, 0.08, 0.10, 0.12};
        for (double r : rates) {
            double fv = futureValueRecursive(principal, r, 10);
            System.out.printf("Rate %4.0f%% → $%,.2f%n", r * 100, fv);
        }

        System.out.println("\n=== Algorithm Analysis ===");
        System.out.println("Recursive:  O(n) time, O(n) space (call stack)");
        System.out.println("Iterative:  O(n) time, O(1) space");
        System.out.println("Memoized:   O(n) time first call, O(1) subsequent calls");
    }
}