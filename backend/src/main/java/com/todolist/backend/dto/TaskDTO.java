package com.todolist.backend.dto;

import java.time.Instant;

public class TaskDTO {
    private String id;
    private String title;
    private String description;
    private Instant dateTime;   // data de criação
    private Instant dueDate;    // prazo de conclusão
    private Boolean completed;
    private String userId;

    public TaskDTO() {}

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Instant getDateTime() { return dateTime; }
    public void setDateTime(Instant dateTime) { this.dateTime = dateTime; }

    public Instant getDueDate() { return dueDate; }
    public void setDueDate(Instant dueDate) { this.dueDate = dueDate; }

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
