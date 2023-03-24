package editor.service;

import editor.entity.User;
import editor.entity.VerificationToken;
import editor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(Map<String, String> requestParams) {
        User user = new User();
        user.setEmail(requestParams.get("email"));
        user.setFirstName(requestParams.get("firstName"));
        user.setLastName(requestParams.get("lastName"));
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(requestParams.get("password")));
        userRepository.save(user);
        return user;
    }

    @Override
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent())
            return user.get();
        else
            return null;
    }

    @Override
    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public boolean checkValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword,user.getPassword());
    }
}
