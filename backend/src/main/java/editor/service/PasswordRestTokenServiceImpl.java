package editor.service;

import editor.entity.PasswordRestToken;
import editor.entity.User;
import editor.repository.PasswordRestTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
public class PasswordRestTokenServiceImpl implements  PasswordRestTokenService{
    @Autowired
    private PasswordRestTokenRepository passwordRestTokenRepository;

    @Override
    public void createPasswordRestTokenForUser(User user, String token) {
        PasswordRestToken passwordRestToken =
                new PasswordRestToken(user,token);
        passwordRestTokenRepository.save(passwordRestToken);
    }

    @Override
    public String validatePassword(String token) {
        PasswordRestToken passwordRestToken =
                passwordRestTokenRepository.findByToken(token);
        if(passwordRestToken == null)
        {
            return "invalid token";
        }else{
            User user = passwordRestToken.getUser();
            Calendar calendar = Calendar.getInstance();
            if((passwordRestToken.getExpirationTime().getTime()
                - calendar.getTime().getTime())<=0){
                passwordRestTokenRepository.delete(passwordRestToken);
                return "token expired";
            }
            return "valid token";
        }
    }

    @Override
    public Optional<User> getUserByPasswordRestToken(String token) {
        return Optional.ofNullable(passwordRestTokenRepository.findByToken(token).getUser());
    }
}
