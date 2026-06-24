package com.cognizant.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorSetupTest {

    // Simple test to confirm JUnit is configured
    @Test
    void testJUnitIsWorking() {
        // If this test runs, JUnit 5 is set up correctly
        assertTrue(true, "JUnit 5 is set up and running!");
    }

    @Test
    void testAddition() {
        Calculator calc = new Calculator();
        int result = calc.add(2, 3);
        assertEquals(5, result, "2 + 3 should equal 5");
    }

    @Test
    void testSubtraction() {
        Calculator calc = new Calculator();
        assertEquals(1, calc.subtract(5, 4));
    }

    @Test
    void testMultiplication() {
        Calculator calc = new Calculator();
        assertEquals(12, calc.multiply(3, 4));
    }

    @Test
    void testDivision() {
        Calculator calc = new Calculator();
        assertEquals(2.5, calc.divide(5.0, 2.0), 0.001);
    }

    @Test
    void testDivisionByZeroThrowsException() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class,
                () -> calc.divide(10, 0),
                "Division by zero must throw ArithmeticException");
    }
}