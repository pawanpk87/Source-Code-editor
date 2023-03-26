package editor.service;

import editor.dto.AuthRequest;
import editor.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {
    User registerUser(Map<String, String> requestParams);

    User findUserByEmail(String email);

    void changePassword(User user, String newPassword);

    boolean checkValidOldPassword(User user, String oldPassword);

    ResponseEntity<String> authenticateUserAndGenerateAccessToken(AuthRequest authRequest, String accessToken);

    User getUserByCookie(String accessToken);
}
