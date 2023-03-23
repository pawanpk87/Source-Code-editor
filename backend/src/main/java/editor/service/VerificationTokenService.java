package editor.service;

import editor.entity.User;

public interface VerificationTokenService {
    void saveVerificationTokenForUser(String token, User user);

    String validateVerificationToken(String token);
}
