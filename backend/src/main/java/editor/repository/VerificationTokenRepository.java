package editor.repository;

import editor.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken,String> {
    VerificationToken findByToken(String token);
}
