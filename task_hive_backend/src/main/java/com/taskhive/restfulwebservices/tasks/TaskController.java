package com.taskhive.restfulwebservices.tasks;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {


    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/basicAuth")
    public String basicAuthentication() {
        return "Success";
    }

    @GetMapping("/users/{username}/tasks")
    public List<Task> getTasksByUsername(@PathVariable String username) {
        return taskRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/tasks/{id}")
    public Task getTaskById(@PathVariable String username, @PathVariable int id) {
        return taskRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/tasks/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable String username, @PathVariable int id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/tasks/{id}")
    public Task updateTaskById(@PathVariable String username, @PathVariable int id, @RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PostMapping("/users/{username}/tasks")
    public Task createTask(@PathVariable String username, @RequestBody Task task) {
        task.setUsername(username);
        task.setId(null);
        return taskRepository.save(task);
    }
}
