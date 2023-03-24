package editor.config;

import editor.entity.User;
import editor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername...");
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println(user);
        return user.map(CustomUserDetails::new)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }
}
