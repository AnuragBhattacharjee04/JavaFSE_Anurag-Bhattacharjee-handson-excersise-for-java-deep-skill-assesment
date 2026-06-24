package com.cognizant.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
class AssertionsTest {

    private final Calculator calculator = new Calculator();

    @Test
    void testAssertEquals() {
        assertEquals(10, calculator.add(7, 3));
        assertEquals(2.0, calculator.divide(10, 5), 0.001, "Division result mismatch");
    }
    @Test
    void testAssertNotEquals() {
        assertNotEquals(0, calculator.add(2, 3), "Sum should not be zero");
    }
    @Test
    void testAssertTrueAndFalse() {
        assertTrue(calculator.isEven(4),  "4 should be even");
        assertFalse(calculator.isEven(7), "7 should not be even");
    }

    @Test
    void testAssertNullAndNotNull() {
        String s = null;
        assertNull(s, "String should be null");

        Calculator c = new Calculator();
        assertNotNull(c, "Calculator should not be null");
    }

    @Test
    void testAssertThrows() {
        ArithmeticException ex = assertThrows(
                ArithmeticException.class,
                () -> calculator.divide(5, 0)
        );
        assertTrue(ex.getMessage().contains("zero"),
                "Exception message should mention zero");
    }

    @Test
    void testFactorialNegativeThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> calculator.factorial(-1));
    }

    @Test
    void testAssertAll() {
        assertAll("calculator operations",
                () -> assertEquals(5,  calculator.add(2, 3)),
                () -> assertEquals(1,  calculator.subtract(4, 3)),
                () -> assertEquals(6,  calculator.multiply(2, 3)),
                () -> assertEquals(4.0, calculator.divide(8, 2), 0.001),
                () -> assertTrue(calculator.isEven(10))
        );
    }

    @Test
    void testAssertArrayEquals() {
        int[] expected = {1, 2, 3, 4, 5};
        int[] actual   = {1, 2, 3, 4, 5};
        assertArrayEquals(expected, actual, "Arrays should be equal");
    }

    @Test
    void testAssertIterableEquals() {
        List<Integer> expected = Arrays.asList(1, 4, 9, 16, 25);
        List<Integer> actual   = Arrays.asList(1, 4, 9, 16, 25);
        assertIterableEquals(expected, actual);
    }

    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "10, 20, 30",
        "-5, 5, 0",
        "100, 200, 300"
    })
    void testAddParameterized(int a, int b, int expected) {
        assertEquals(expected, calculator.add(a, b));
    }
    @Test
    void testFactorial() {
        assertAll("factorials",
                () -> assertEquals(1,   calculator.factorial(0)),
                () -> assertEquals(1,   calculator.factorial(1)),
                () -> assertEquals(6,   calculator.factorial(3)),
                () -> assertEquals(120, calculator.factorial(5))
        );
    }
}