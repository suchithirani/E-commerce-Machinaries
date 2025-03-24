package com.machine.backend.services;

import com.machine.backend.Dto.UserDto;
import com.machine.backend.models.User;
import com.machine.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        return convertToDTO(user);
    }

    public UserDto createUser(UserDto userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // Directly storing the password (no encoding)

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDto updateUser(Long id, UserDto userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (userDTO.getName() != null && !userDTO.getName().isBlank()) {
            user.setName(userDTO.getName());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new RuntimeException("Email already exists!");
            }
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            user.setPassword(userDTO.getPassword()); // Directly updating the password (no encoding)
        }

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDto authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    
        // Simple plain-text password check (not recommended for production)
        if (user.getPassword().equals(password)) {
            return convertToDTO(user);
        } else {
            return null;  // Return null if the password does not match.
        }
    }
    

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserDto convertToDTO(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}
