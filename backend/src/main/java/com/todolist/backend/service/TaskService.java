package com.todolist.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.todolist.backend.dto.TaskDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Serviço responsável pelas operações de CRUD de tarefas no Firebase Firestore.
 * Cada método interage com a coleção "tasks" do Firestore.
 */
@Service
public class TaskService {

    private static final String COLLECTION = "tasks"; // Nome da coleção de tarefas

    /**
     * Lista todas as tarefas de um usuário específico.
     * @param userId ID do usuário
     * @return Lista de tarefas do usuário
     */
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

    /**
     * Cria uma nova tarefa para o usuário.
     * @param userId ID do usuário
     * @param taskDTO Dados da tarefa
     * @return Tarefa criada com ID definido
     */
    public TaskDTO createTask(String userId, TaskDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        Instant creationDate = Instant.now();
        taskDTO.setDateTime(creationDate);

        Map<String, Object> data = new HashMap<>();
        data.put("title", taskDTO.getTitle());
        data.put("description", taskDTO.getDescription());
        data.put("dateTime", creationDate); // data de criação
        data.put("dueDate", taskDTO.getDueDate()); // prazo enviado pelo front
        data.put("completed", taskDTO.getCompleted() != null ? taskDTO.getCompleted() : false);
        data.put("userId", userId);

        DocumentReference ref = db.collection(COLLECTION).document();
        ref.set(data).get();
        taskDTO.setId(ref.getId());
        return taskDTO;
    }

    /**
     * Atualiza uma tarefa existente.
     * @param id ID da tarefa
     * @param taskDTO Dados atualizados da tarefa
     * @return Tarefa atualizada
     */
    public TaskDTO updateTask(String id, TaskDTO taskDTO) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference ref = db.collection(COLLECTION).document(id);

        Map<String, Object> updates = new HashMap<>();
        updates.put("title", taskDTO.getTitle());
        updates.put("description", taskDTO.getDescription());
        updates.put("dueDate", taskDTO.getDueDate()); // atualiza prazo
        updates.put("completed", taskDTO.getCompleted());

        ref.update(updates).get();
        taskDTO.setId(id);
        return taskDTO;
    }

    /**
     * Alterna o status de conclusão de uma tarefa.
     * @param id ID da tarefa
     * @param completed Novo estado de conclusão
     */
    public void toggleCompleted(String id, boolean completed) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(id)
                .update("completed", completed)
                .get();
    }

    /**
     * Deleta uma tarefa existente.
     * @param id ID da tarefa
     */
    public void deleteTask(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION).document(id).delete().get();
    }
}
