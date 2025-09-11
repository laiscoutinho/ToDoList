# ToDoList – Full-Stack React.js and Java

## Informações do Projeto

* **Projeto:** Lista de Tarefas
* **Objetivo:** Desenvolver uma aplicação web full-stack para gerenciamento de tarefas, aplicando boas práticas de front-end e back-end, integração com Firebase e fundamentos de React.js e Bootstrap.

---

## Descrição Geral

O projeto consiste em uma aplicação web para criação, edição, conclusão e exclusão de tarefas, permitindo ao usuário organizar suas atividades de forma intuitiva e responsiva. Cada tarefa conterá:

* **Título** (obrigatório)
* **Descrição**
* **Data e hora** (válida, não podendo ser anterior ao momento atual)
* **Status** (concluída ou não)

As tarefas serão exibidas em uma lista dinâmica, com estilo diferenciado para tarefas concluídas (texto tachado), garantindo uma experiência visual clara.

---

## Funcionalidades do Front-end

1. Adição, edição, marcação como concluída e exclusão de tarefas.
2. Formulário responsivo para adição/edição contendo:

   * Campo de texto para título (obrigatório)
   * Campo de texto para descrição
   * Campo de data e hora
   * Botões de salvar e cancelar
3. Tratamento de erros:

   * Título obrigatório
   * Data e hora válidas
   * Alertas para tarefas duplicadas (mesmo título e data/hora)
4. Layout responsivo para dispositivos desktop, tablet e mobile.
5. Boas práticas de front-end:

   * Separação clara entre HTML, CSS e JavaScript
   * Código organizado, legível e comentado
   * Uso consistente de classes e IDs para estilização e manipulação via JS

---

## Funcionalidades do Back-end

O back-end será implementado usando **Firebase** e terá endpoints para as seguintes operações:

* **GET /tarefas** – Listar todas as tarefas do usuário autenticado
* **POST /tarefas** – Criar uma nova tarefa
* **PUT /tarefas/\:id** – Editar tarefa existente
* **PATCH /tarefas/\:id/concluir** – Marcar como concluída/não concluída
* **DELETE /tarefas/\:id** – Remover uma tarefa

Cada tarefa terá os seguintes campos obrigatórios:

* `id` – Gerado automaticamente pelo Firebase
* `titulo` – Texto
* `descricao` – Texto
* `dataHora` – Timestamp
* `concluida` – Booleano

---

## Tecnologias Utilizadas

* **Front-end:**

  * React.js
  * Bootstrap
  * JavaScript
* **Back-end:**

  * Firebase (autenticação e Firestore)
  * Backend em Java 

---

## Como Executar

1. Clonar o repositório:

```bash
git clone https://github.com/laiscoutinho/ToDoList.git
```

2. Instalar dependências:

```bash
npm install
```

3. Configurar variáveis de ambiente no `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Rodar a aplicação:

```bash
npm run dev
```

---

## Observações

* O projeto foi desenvolvido com foco em **boas práticas full-stack** e **responsividade**.
* Fique livre para fazer Pull-Requests e contribuir com o projeto!