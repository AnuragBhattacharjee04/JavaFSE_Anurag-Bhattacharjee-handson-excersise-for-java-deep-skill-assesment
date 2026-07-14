package com.cognizant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
class Account {
    private int    id;
    private String accountNumber;
    private String accountType;    
    private String customerName;
    private String email;
    private double balance;
    private String status;         

    public Account() {}

    public Account(int id, String accountNumber, String accountType,
                   String customerName, String email, double balance, String status) {
        this.id            = id;
        this.accountNumber = accountNumber;
        this.accountType   = accountType;
        this.customerName  = customerName;
        this.email         = email;
        this.balance       = balance;
        this.status        = status;
    }

    public int    getId()            { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getAccountType()   { return accountType; }
    public String getCustomerName()  { return customerName; }
    public String getEmail()         { return email; }
    public double getBalance()       { return balance; }
    public String getStatus()        { return status; }

    public void setId(int id)           { this.id = id; }
    public void setBalance(double b)    { this.balance = b; }
    public void setStatus(String s)     { this.status = s; }
}
@RestController
@RequestMapping("/api/accounts")
class AccountController {

    private final Map<Integer, Account> store = new LinkedHashMap<>();
    private final AtomicInteger idGen         = new AtomicInteger(1);

    AccountController() {
        addSample(new Account(0, "ACC-001", "SAVINGS", "Alice Johnson", "alice@bank.com",  150000.00, "ACTIVE"));
        addSample(new Account(0, "ACC-002", "CURRENT", "Bob Smith",     "bob@bank.com",    275000.00, "ACTIVE"));
        addSample(new Account(0, "ACC-003", "SAVINGS", "Carol White",   "carol@bank.com",   50000.00, "ACTIVE"));
        addSample(new Account(0, "ACC-004", "CURRENT", "David Brown",   "david@bank.com",  320000.00, "BLOCKED"));
        addSample(new Account(0, "ACC-005", "SAVINGS", "Eva Chen",      "eva@bank.com",     80000.00, "ACTIVE"));
    }

    private void addSample(Account a) {
        int id = idGen.getAndIncrement();
        a.setId(id);
        store.put(id, a);
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAll() {
        return ResponseEntity.ok(new ArrayList<>(store.values()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Account a = store.get(id);
        return a != null ? ResponseEntity.ok(a)
                         : ResponseEntity.status(HttpStatus.NOT_FOUND)
                                         .body("Account not found: " + id);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Account>> search(@RequestParam String name) {
        List<Account> result = new ArrayList<>();
        for (Account a : store.values()) {
            if (a.getCustomerName().toLowerCase().contains(name.toLowerCase())) {
                result.add(a);
            }
        }
        return ResponseEntity.ok(result);
    }
    @PostMapping
    public ResponseEntity<Account> create(@RequestBody Account account) {
        int id = idGen.getAndIncrement();
        account.setId(id);
        store.put(id, account);
        return ResponseEntity.status(HttpStatus.CREATED).body(account);
    }
    @PutMapping("/{id}/deposit")
    public ResponseEntity<?> deposit(@PathVariable int id,
                                     @RequestParam double amount) {
        Account a = store.get(id);
        if (a == null) return ResponseEntity.notFound().build();
        a.setBalance(a.getBalance() + amount);
        return ResponseEntity.ok(a);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        return store.remove(id) != null
               ? ResponseEntity.noContent().build()
               : ResponseEntity.notFound().build();
    }
    @GetMapping("/info")
    public Map<String, String> info() {
        Map<String, String> info = new LinkedHashMap<>();
        info.put("service",  "account-service");
        info.put("port",     "8081");
        info.put("accounts", String.valueOf(store.size()));
        return info;
    }
}
@SpringBootApplication
@EnableDiscoveryClient
public class AccountServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AccountServiceApplication.class, args);
        System.out.println("\n✅ Account Service started on port 8081");
        System.out.println("   API: http://localhost:8081/api/accounts");
    }
}