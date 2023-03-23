package editor.service;

import editor.entity.PasswordRestToken;
import editor.entity.User;
import editor.repository.PasswordRestTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PasswordRestTokenServiceImpl implements  PasswordRestTokenService{
    @Autowired
    private PasswordRestTokenRepository passwordRestTokenRepository;

    @Override
    public void createPasswordRestTokenForUser(User user, String token) {
        PasswordRestToken passwordRestToken =
                new PasswordRestToken(user,token);
        passwordRestTokenRepository.save(passwordRestToken);
    }
}
