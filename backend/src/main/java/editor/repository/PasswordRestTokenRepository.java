package editor.repository;

import editor.entity.PasswordRestToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRestTokenRepository extends JpaRepository<PasswordRestToken,Long> {
}
