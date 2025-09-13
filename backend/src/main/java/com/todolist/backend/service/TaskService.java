package com.todolist.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.todolist.backend.dto.TaskDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class TaskService {

    private static final String COLLECTION = "tasks";

    // List all tasks for a user
    public List<TaskDTO> listTasks(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION)
                .whereEqualTo("userId", userId)
                .get();

        List<TaskDTO> tasks = new ArrayList<>();
        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            TaskDTO task = doc.toObject(TaskDTO.class);
            task.setId(doc.getId());
            tasks.add(task);
        }
        return tasks;
    }

    // Create new task
    public TaskDTO createTask(String userId, TaskDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> data = new HashMap<>();
        data.put("title", taskDTO.getTitle());
        data.put("description", taskDTO.getDescription());
        data.put("dateTime", taskDTO.getDateTime() != null ? taskDTO.getDateTime() : Instant.now());
        data.put("completed", taskDTO.getCompleted() != null ? taskDTO.getCompleted() : false);
        data.put("userId", userId);

        DocumentReference ref = db.collection(COLLECTION).document();
        ref.set(data).get();
        taskDTO.setId(ref.getId());
        return taskDTO;
    }

    // Update existing task
    public TaskDTO updateTask(String id, TaskDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference ref = db.collection(COLLECTION).document(id);

        Map<String, Object> updates = new HashMap<>();
        updates.put("title", taskDTO.getTitle());
        updates.put("description", taskDTO.getDescription());
        updates.put("dateTime", taskDTO.getDateTime());
        updates.put("completed", taskDTO.getCompleted());

        ref.update(updates).get();
        taskDTO.setId(id);
        return taskDTO;
    }

    // Toggle completed
    public void toggleCompleted(String id, boolean completed) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(id)
                .update("completed", completed)
                .get();
    }

    // Delete task
    public void deleteTask(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(id).delete().get();
    }
}
