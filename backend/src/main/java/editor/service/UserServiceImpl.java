package editor.service;

import editor.dto.AuthRequest;
import editor.entity.User;
import editor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

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

    @Override
    public ResponseEntity<String>  authenticateUserAndGenerateAccessToken(AuthRequest authRequest, String accessToken) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(()-> new IllegalArgumentException("User not found with email " + authRequest.getEmail()));
        if(user != null && checkValidOldPassword(user,authRequest.getPassword())){
            String email = authRequest.getEmail();
            HttpHeaders responseHeaders  = new HttpHeaders();
            if(accessToken == null){
                accessToken = jwtService.generateToken(user.getEmail());
            }
            addAccessTokenCookie(responseHeaders,accessToken);

            return ResponseEntity.ok().headers(responseHeaders).body("success");
        }
        else
            return null;
    }

    private void addAccessTokenCookie(HttpHeaders responseHeaders, String token) {
        Long duration = System.currentTimeMillis() + TimeUnit.HOURS.toMillis(24);
        responseHeaders.add(HttpHeaders.SET_COOKIE,
                String.valueOf(ResponseCookie.from("accessToken",token)
                        .maxAge(duration)
                        .httpOnly(true)
                        .sameSite("None")
                        .secure(true)
                        .path("/")
                        .build())
                );
    }

    @Override
    public User getUserByCookie(String accessToken) {
        String email = jwtService.extractUsername(accessToken);
        if(email != null){
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()){
                return user.get();
            }
        }
        return null;
    }
}
