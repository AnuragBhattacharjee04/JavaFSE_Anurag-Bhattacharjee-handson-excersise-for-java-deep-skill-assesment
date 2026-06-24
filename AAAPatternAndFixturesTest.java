package com.cognizant.service;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AAAPatternAndFixturesTest {
    private Calculator calculator;
    @BeforeAll
    static void initSuite() {
        System.out.println("[BeforeAll]  Test suite starting...");
    }

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
        System.out.println("[BeforeEach] Calculator created for test.");
    }
    @AfterEach
    void tearDown() {
        calculator = null;
        System.out.println("[AfterEach]  Calculator nulled after test.\n");
    }
    @AfterAll
    static void cleanUpSuite() {
        System.out.println("[AfterAll]   Test suite finished.");
    }

    @Test
    @Order(1)
    @DisplayName("AAA: Addition of two positive numbers")
    void testAddition_AAA() {
        // ARRANGE
        int operandA = 15;
        int operandB = 25;
        int expected = 40;
        int actual = calculator.add(operandA, operandB);

        assertEquals(expected, actual, "15 + 25 should equal 40");
    }

    @Test
    @Order(2)
    @DisplayName("AAA: Division produces correct result")
    void testDivision_AAA() {
        
        double dividend = 100.0;
        double divisor  = 4.0;
        double expected = 25.0;
        double actual = calculator.divide(dividend, divisor);
        assertEquals(expected, actual, 0.0001);
    }

    @Test
    @Order(3)
    @DisplayName("AAA: Division by zero throws ArithmeticException")
    void testDivisionByZero_AAA() {
        double dividend = 10.0;
        double divisor  = 0.0;
        ArithmeticException exception = assertThrows(
                ArithmeticException.class,
                () -> calculator.divide(dividend, divisor)
        );
        assertTrue(exception.getMessage().contains("zero"));
    }

    @Test
    @Order(4)
    @DisplayName("Fixture: Same calculator instance per test")
    void testFixtureIsRecreated() {
        assertNotNull(calculator, "Calculator fixture should be injected by @BeforeEach");
        assertEquals(0, calculator.add(0, 0));
    }

    @Test
    @Order(5)
    @DisplayName("AAA: Multiplying with zero")
    void testMultiplyByZero() {
        int number = 9999;
        int zero   = 0;
        int result = calculator.multiply(number, zero);
        assertEquals(0, result, "Any number times zero is zero");
    }

    @Test
    @Order(6)
    @DisplayName("AAA: Subtraction resulting in negative number")
    void testSubtractionNegativeResult() {
        int a = 3, b = 10;
        int result = calculator.subtract(a, b);
        assertEquals(-7, result);
        assertTrue(result < 0, "Result should be negative");
    }
    @Nested
    @DisplayName("Factorial tests")
    class FactorialTests {

        @Test
        @DisplayName("Factorial of 0 is 1")
        void testFactorialZero() {
            assertEquals(1, calculator.factorial(0));
        }

        @Test
        @DisplayName("Factorial of 5 is 120")
        void testFactorialFive() {
            assertEquals(120, calculator.factorial(5));
        }

        @Test
        @DisplayName("Negative input throws exception")
        void testFactorialNegative() {
            assertThrows(IllegalArgumentException.class,
                    () -> calculator.factorial(-3));
        }
    }
}