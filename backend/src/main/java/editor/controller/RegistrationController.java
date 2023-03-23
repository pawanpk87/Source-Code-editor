package editor.controller;

import editor.dto.AuthRequest;
import editor.entity.User;
import editor.service.JwtService;
import editor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class RegistrationController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/test")
    public String test(){
        return "test";
    }

    @PostMapping("/register")
    public String registerUser(
            @RequestBody Map<String,String> requestParams
            ){
        System.out.println(requestParams);
        User user = userService.registerUser(
                requestParams
        );
        return "success";
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest){
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authRequest.getEmail(),
                                authRequest.getPassword()
                        )
                );
        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmail());
        }else{
            throw new UsernameNotFoundException("User not found");
        }
    }
}
