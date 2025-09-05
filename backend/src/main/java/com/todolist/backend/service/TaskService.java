package com.todolist.backend.service;

import com.todolist.backend.model.Task;
import com.todolist.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getTasks() {
        return repo.findAll();
    }

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Task task) {
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public Task toggleTask(Long id) {
        Task task = repo.findById(id).orElseThrow(() -> new RuntimeException("Task não encontrada"));
        task.setDone(!task.isDone());
        return repo.save(task);
    }
}
