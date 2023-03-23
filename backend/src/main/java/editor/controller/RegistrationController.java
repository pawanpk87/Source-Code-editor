package editor.controller;

import editor.dto.AuthRequest;
import editor.entity.User;
import editor.event.RegistrationCompleteEvent;
import editor.service.JwtService;
import editor.service.UserService;
import editor.service.VerificationTokenService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
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
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;
    @Autowired
    private VerificationTokenService verificationTokenService;

    @GetMapping("/test")
    public String test() throws MessagingException {
        return "test";
    }

    @PostMapping("/register")
    public String registerUser(
            @RequestBody Map<String,String> requestParams,
            HttpServletRequest httpServletRequest
            ){
        User user = userService.registerUser(
                requestParams
        );

        applicationEventPublisher.publishEvent(
                new RegistrationCompleteEvent(
                        user,
                        applicationUrl(httpServletRequest)
                )
        );

        return "success";
    }

    @GetMapping("/verifyRegistration")
    public String verifyRegistration(@RequestParam("token") String token){
        System.out.println("Got the request for verify");
        String result = verificationTokenService.validateVerificationToken(token);
        System.out.println(result);
        if(result.equalsIgnoreCase("valid token")) {
            return "User verified successfully";
        }else{
            return "Expired Token!!!";
        }
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

    private String applicationUrl(HttpServletRequest httpServletRequest) {
        return "http:/"
                +httpServletRequest.getServerName()
                +":"
                +httpServletRequest.getLocalPort()
                +httpServletRequest.getContextPath();
    }
}
