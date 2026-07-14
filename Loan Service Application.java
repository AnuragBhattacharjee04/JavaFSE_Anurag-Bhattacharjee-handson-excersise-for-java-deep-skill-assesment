package com.cognizant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
class Loan {
    private int    id;
    private String loanNumber;
    private String loanType;       
    private String customerName;
    private int    customerId;
    private double principalAmount;
    private double interestRate;   
    private int    tenureMonths;
    private String status;         

    public Loan() {}

    public Loan(int id, String loanNumber, String loanType, String customerName,
                int customerId, double principalAmount, double interestRate,
                int tenureMonths, String status) {
        this.id              = id;
        this.loanNumber      = loanNumber;
        this.loanType        = loanType;
        this.customerName    = customerName;
        this.customerId      = customerId;
        this.principalAmount = principalAmount;
        this.interestRate    = interestRate;
        this.tenureMonths    = tenureMonths;
        this.status          = status;
    }

    public int    getId()              { return id; }
    public String getLoanNumber()      { return loanNumber; }
    public String getLoanType()        { return loanType; }
    public String getCustomerName()    { return customerName; }
    public int    getCustomerId()      { return customerId; }
    public double getPrincipalAmount() { return principalAmount; }
    public double getInterestRate()    { return interestRate; }
    public int    getTenureMonths()    { return tenureMonths; }
    public String getStatus()          { return status; }
    public void   setId(int id)        { this.id = id; }
    public void   setStatus(String s)  { this.status = s; }
    public double getMonthlyEmi() {
        if (interestRate == 0) return principalAmount / tenureMonths;
        double r = interestRate / 1200.0;
        double emi = (principalAmount * r * Math.pow(1 + r, tenureMonths))
                     / (Math.pow(1 + r, tenureMonths) - 1);
        return Math.round(emi * 100.0) / 100.0;
    }

    public double getTotalPayable() {
        return Math.round(getMonthlyEmi() * tenureMonths * 100.0) / 100.0;
    }

    public double getTotalInterest() {
        return Math.round((getTotalPayable() - principalAmount) * 100.0) / 100.0;
    }
}
@RestController
@RequestMapping("/api/loans")
class LoanController {

    private final Map<Integer, Loan> store = new LinkedHashMap<>();
    private final AtomicInteger idGen      = new AtomicInteger(1);

    LoanController() {
        addSample(new Loan(0,"LN-001","HOME",     "Alice Johnson",1, 2500000,  8.5, 240,"ACTIVE"));
        addSample(new Loan(0,"LN-002","PERSONAL", "Bob Smith",    2,   75000, 13.5,  36,"ACTIVE"));
        addSample(new Loan(0,"LN-003","VEHICLE",  "Carol White",  3,  850000,  9.0,  60,"PENDING"));
        addSample(new Loan(0,"LN-004","EDUCATION","David Brown",  4,  500000,  7.5,  84,"ACTIVE"));
        addSample(new Loan(0,"LN-005","HOME",     "Eva Chen",     5, 3200000,  8.0, 300,"ACTIVE"));
    }

    private void addSample(Loan l) {
        int id = idGen.getAndIncrement();
        l.setId(id);
        store.put(id, l);
    }
    @GetMapping
    public ResponseEntity<List<Loan>> getAll() {
        return ResponseEntity.ok(new ArrayList<>(store.values()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Loan l = store.get(id);
        return l != null ? ResponseEntity.ok(l)
                         : ResponseEntity.status(HttpStatus.NOT_FOUND)
                                         .body("Loan not found: " + id);
    }
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Loan>> getByCustomer(@PathVariable int customerId) {
        List<Loan> result = new ArrayList<>();
        for (Loan l : store.values()) {
            if (l.getCustomerId() == customerId) result.add(l);
        }
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{id}/emi")
    public ResponseEntity<?> getEmiDetails(@PathVariable int id) {
        Loan l = store.get(id);
        if (l == null) return ResponseEntity.notFound().build();

        Map<String, Object> emiDetails = new LinkedHashMap<>();
        emiDetails.put("loanNumber",      l.getLoanNumber());
        emiDetails.put("customerName",    l.getCustomerName());
        emiDetails.put("principalAmount", l.getPrincipalAmount());
        emiDetails.put("interestRate",    l.getInterestRate() + "%");
        emiDetails.put("tenureMonths",    l.getTenureMonths());
        emiDetails.put("monthlyEMI",      l.getMonthlyEmi());
        emiDetails.put("totalPayable",    l.getTotalPayable());
        emiDetails.put("totalInterest",   l.getTotalInterest());
        return ResponseEntity.ok(emiDetails);
    }
    @PostMapping
    public ResponseEntity<Loan> applyLoan(@RequestBody Loan loan) {
        int id = idGen.getAndIncrement();
        loan.setId(id);
        loan.setStatus("PENDING");
        store.put(id, loan);
        return ResponseEntity.status(HttpStatus.CREATED).body(loan);
    }
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveLoan(@PathVariable int id) {
        Loan l = store.get(id);
        if (l == null) return ResponseEntity.notFound().build();
        l.setStatus("ACTIVE");
        return ResponseEntity.ok(l);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> closeLoan(@PathVariable int id) {
        return store.remove(id) != null
               ? ResponseEntity.noContent().build()
               : ResponseEntity.notFound().build();
    }
    @GetMapping("/info")
    public Map<String, String> info() {
        Map<String, String> info = new LinkedHashMap<>();
        info.put("service", "loan-service");
        info.put("port",    "8082");
        info.put("loans",   String.valueOf(store.size()));
        return info;
    }
}
@SpringBootApplication
@EnableDiscoveryClient
public class LoanServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoanServiceApplication.class, args);
        System.out.println("\n✅ Loan Service started on port 8082");
        System.out.println("   API: http://localhost:8082/api/loans");
    }
}