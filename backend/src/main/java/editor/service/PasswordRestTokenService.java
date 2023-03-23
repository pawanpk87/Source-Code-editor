package editor.service;

import editor.entity.User;

import java.util.Optional;

public interface PasswordRestTokenService {
    void createPasswordRestTokenForUser(User user, String token);

    String validatePassword(String token);

    Optional<User> getUserByPasswordRestToken(String token);
}
