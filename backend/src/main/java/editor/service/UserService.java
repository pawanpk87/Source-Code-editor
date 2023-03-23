package editor.service;

import editor.entity.User;

import java.util.Map;

public interface UserService {
    User registerUser(Map<String, String> requestParams);
}
