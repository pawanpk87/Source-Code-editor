package editor.listener;

import editor.entity.User;
import editor.event.RegistrationCompleteEvent;
import editor.service.EmailSenderService;
import editor.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private VerificationTokenService verificationTokenService;

    @Autowired
    private EmailSenderService emailSenderService;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        System.out.println("onApplicationEvent called...");
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        verificationTokenService.saveVerificationTokenForUser(token,user);
        String url = event.getApplicationURL()
                +"/verifyRegistration?token="
                +token;
        System.out.println("saved verificationToken");
        System.out.println("sending mail...");
        // send verification mail to user
        String toEmail = user.getEmail();
        String body = "Hello " +user.getFirstName() +
                "Click the link to verify your account "+url;
        String subject = "Verify Registration";

        emailSenderService.sendSimpleEmail(
                toEmail,
                body,
                subject
        );
    }
}
