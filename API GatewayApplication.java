package com.cognizant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/:8080/api/loans
 */
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
        System.out.println("\n✅ API Gateway started on port 8080");
        System.out.println("   Routes: /api/accounts → account-service:8081");
        System.out.println("           /api/loans    → loan-service:8082");
    }
}