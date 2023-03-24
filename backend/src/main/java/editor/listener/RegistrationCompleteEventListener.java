package editor.listener;

import editor.entity.User;
import editor.event.RegistrationCompleteEvent;
import editor.service.EmailSenderService;
import editor.service.VerificationTokenService;
import jakarta.mail.MessagingException;
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
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        verificationTokenService.saveVerificationTokenForUser(token,user);
        String url = event.getApplicationURL()
                +"/verifyRegistration?token="
                +token;
        // send verification mail to user
        String toEmail = user.getEmail();
        String body = "Hello " +user.getFirstName() +" "+
                "Click the link to verify your account <a href="+url+">link</a>";
        String subject = "Verify Registration";
        try {
            emailSenderService.sendEmailWithAttachment(
                    toEmail,
                    body,
                    subject,
                    null
            );
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
