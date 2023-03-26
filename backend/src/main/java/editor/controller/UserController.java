package editor.controller;

import editor.entity.User;
import editor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public User getUser(@RequestParam("email") String email){
        User user = userService.findUserByEmail(email);
        return user;
    }

    @GetMapping("/login")
    public User getUserByCookie(@CookieValue(name = "accessToken", required = true) String accessToken) {
        return userService.getUserByCookie(accessToken);
    }
}
