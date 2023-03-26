package editor.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(value = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
    @GetMapping
    public String projects(){
        return "all projects";
    }
}