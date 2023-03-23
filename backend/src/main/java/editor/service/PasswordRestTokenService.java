package editor.service;

import editor.entity.User;

public interface PasswordRestTokenService {
    void createPasswordRestTokenForUser(User user, String token);
}
