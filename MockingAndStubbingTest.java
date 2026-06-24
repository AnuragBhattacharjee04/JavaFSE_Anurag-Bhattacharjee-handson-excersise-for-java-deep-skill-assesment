package com.cognizant.service;

import com.cognizant.model.User;
import com.cognizant.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class MockingAndStubbingTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    private User alice;
    private User bob;

    @BeforeEach
    void setUp() {
        alice = new User(1, "Alice", "alice@example.com");
        bob   = new User(2, "Bob",   "bob@example.com");
    }

    @Test
    @DisplayName("Stub: findById returns expected user")
    void testGetUserById_Stubbing() {
        when(userRepository.findById(1)).thenReturn(Optional.of(alice));
        User result = userService.getUserById(1);
        assertNotNull(result);
        assertEquals("Alice", result.getName());
        assertEquals("alice@example.com", result.getEmail());
    }

    @Test
    @DisplayName("Stub: findById returns empty → service throws RuntimeException")
    void testGetUserById_NotFound() {
        when(userRepository.findById(99)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.getUserById(99));
        assertTrue(ex.getMessage().contains("not found"));
    }
    @Test
    @DisplayName("Stub: findAll returns list of users")
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(alice, bob));

        List<User> users = userService.getAllUsers();

        assertEquals(2, users.size());
        assertEquals("Alice", users.get(0).getName());
        assertEquals("Bob",   users.get(1).getName());
    }

    @Test
    @DisplayName("Stub: existsById=false allows user creation")
    void testCreateUser_Success() {
        when(userRepository.existsById(3)).thenReturn(false);
        User newUser = new User(3, "Carol", "carol@example.com");
        assertDoesNotThrow(() -> userService.createUser(newUser));
    }

    @Test
    @DisplayName("Stub: existsById=true → createUser throws")
    void testCreateUser_DuplicateThrows() {
        when(userRepository.existsById(1)).thenReturn(true);

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.createUser(alice));
        assertTrue(ex.getMessage().contains("already exists"));
    }

    @Test
    @DisplayName("Stub: thenThrow — repository throws unexpected exception")
    void testFindAll_RepositoryThrows() {
        when(userRepository.findAll())
                .thenThrow(new RuntimeException("Database connection lost"));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.getAllUsers());
        assertEquals("Database connection lost", ex.getMessage());
    }
    @Test
    @DisplayName("Stub: consecutive calls return different values")
    void testConsecutiveCalls() {
        when(userRepository.findById(1))
                .thenReturn(Optional.of(alice))     
                .thenReturn(Optional.empty());       

        Optional<User> first  = userService.findUser(1);
        Optional<User> second = userService.findUser(1);

        assertTrue(first.isPresent());
        assertFalse(second.isPresent());
    }
}