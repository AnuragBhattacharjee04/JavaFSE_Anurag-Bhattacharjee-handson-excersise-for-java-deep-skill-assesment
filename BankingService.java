package com.cognizant.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class BankingService {
    private static final Logger logger = LoggerFactory.getLogger(BankingService.class);

    public void deposit(int accountId, double amount) {
        logger.debug("Entering deposit() — accountId={}, amount={}", accountId, amount);

        if (amount <= 0) {
            logger.warn("Deposit amount must be positive. Received: {}", amount);
            throw new IllegalArgumentException("Amount must be positive");
        }
        logger.info("Deposit successful — accountId={}, amount={}", accountId, amount);
    }

    public void withdraw(int accountId, double amount, double balance) {
        logger.debug("Entering withdraw() — accountId={}, amount={}, balance={}",
                accountId, amount, balance);

        if (amount > balance) {
            logger.warn("Insufficient balance — accountId={}, requested={}, available={}",
                    accountId, amount, balance);
            throw new IllegalStateException("Insufficient balance");
        }

        if (amount > 50_000) {
            logger.warn("Large withdrawal detected — accountId={}, amount={}", accountId, amount);
        }

        logger.info("Withdrawal successful — accountId={}, amount={}", accountId, amount);
    }

    public void transfer(int fromId, int toId, double amount) {
        logger.info("Initiating transfer — from={}, to={}, amount={}", fromId, toId, amount);

        try {
            if (fromId == toId) {
                throw new IllegalArgumentException("Cannot transfer to the same account");
            }
            logger.info("Transfer completed — from={}, to={}, amount={}", fromId, toId, amount);
        } catch (Exception e) {
            logger.error("Transfer failed — from={}, to={}, amount={} | error={}",
                    fromId, toId, amount, e.getMessage(), e);
            throw e;
        }
    }

    public void processTransaction(String txId) {
        logger.trace("Processing transaction — txId={}", txId);

        if (txId == null || txId.isEmpty()) {
            logger.error("Transaction ID is null or empty — cannot process");
            return;
        }
        logger.debug("Transaction validated — txId={}", txId);
        logger.info("Transaction processed — txId={}", txId);
    }
    public static void main(String[] args) {
        BankingService service = new BankingService();

        System.out.println("=== SLF4J Logging Demo ===\n");
        service.deposit(101, 5000.0);
        service.withdraw(101, 60_000, 100_000);
        service.withdraw(101, 1000, 5000);
        service.processTransaction("TXN-20240601-001");
        service.processTransaction("");  
        try {
            service.transfer(1, 1, 500);   
        } catch (Exception ignored) {}

        service.transfer(1, 2, 500);      
    }
}