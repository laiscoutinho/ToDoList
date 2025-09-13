package com.todolist.backend.controller;

import com.todolist.backend.dto.TaskDTO;
import com.todolist.backend.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/tarefas")
@Tag(name = "Tarefas", description = "CRUD de tarefas no Firebase")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // ===================== LIST TASKS =====================
    @Operation(
            summary = "List all tasks for authenticated user",
            description = "Retrieves all tasks from Firebase Firestore for the currently authenticated user.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "List of tasks retrieved successfully"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
            }
    )
    @GetMapping
    public ResponseEntity<List<TaskDTO>> listTasks(
            @Parameter(description = "ID of the authenticated user", required = true)
            @RequestHeader("userId") String userId
    ) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(taskService.listTasks(userId));
    }

    // ===================== CREATE TASK =====================
    @Operation(
            summary = "Create a new task",
            description = "Creates a new task in Firebase Firestore for the authenticated user.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Task object to be created",
                    content = @Content(schema = @Schema(implementation = TaskDTO.class,
                            example = "{ \"title\": \"Buy groceries\", \"description\": \"Milk, eggs, bread\", \"completed\": false }"))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Task created successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
            }
    )
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(
            @Parameter(description = "ID of the authenticated user", required = true)
            @RequestHeader("userId") String userId,
            @RequestBody TaskDTO taskDTO
    ) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(taskService.createTask(userId, taskDTO));
    }

    // ===================== UPDATE TASK =====================
    @Operation(
            summary = "Update an existing task",
            description = "Updates an existing task in Firebase Firestore.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Task object with updated fields",
                    content = @Content(schema = @Schema(implementation = TaskDTO.class,
                            example = "{ \"title\": \"Buy groceries\", \"description\": \"Milk, eggs, bread\", \"completed\": true }"))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Task updated successfully"),
                    @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
            }
    )
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @Parameter(description = "ID of the task to update", required = true)
            @PathVariable String id,
            @RequestBody TaskDTO taskDTO
    ) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(taskService.updateTask(id, taskDTO));
    }

    // ===================== TOGGLE COMPLETED =====================
    @Operation(
            summary = "Toggle task completion status",
            description = "Marks a task as completed or not completed.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Task completion status updated"),
                    @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
            }
    )
    @PatchMapping("/{id}/concluir")
    public ResponseEntity<?> toggleCompleted(
            @Parameter(description = "ID of the task to update", required = true)
            @PathVariable String id,
            @Parameter(description = "Completion status (true or false)", required = true)
            @RequestParam boolean completed
    ) throws ExecutionException, InterruptedException {
        taskService.toggleCompleted(id, completed);
        return ResponseEntity.ok().build();
    }

    // ===================== DELETE TASK =====================
    @Operation(
            summary = "Delete a task",
            description = "Deletes a task from Firebase Firestore.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Task deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Task not found", content = @Content)
            }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(
            @Parameter(description = "ID of the task to delete", required = true)
            @PathVariable String id
    ) throws ExecutionException, InterruptedException {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
