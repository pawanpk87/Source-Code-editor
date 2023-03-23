package editor.service;

import editor.entity.User;

import java.util.Map;

public interface UserService {
    User registerUser(Map<String, String> requestParams);

    User findUserByEmail(String email);

    void changePassword(User user, String newPassword);

    boolean checkValidOldPassword(User user, String oldPassword);
}
