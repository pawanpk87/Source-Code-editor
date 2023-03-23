package editor.service;

import editor.entity.User;
import editor.entity.VerificationToken;

public interface VerificationTokenService {
    void saveVerificationTokenForUser(String token, User user);

    String validateVerificationToken(String token);

    VerificationToken generateNewVerificationToken(String oldToken);
}
