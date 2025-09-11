# LToDoList – Front-end

## Projeto

Aplicação web para gerenciamento de tarefas, desenvolvida para treinamento em **React.js, JavaScript e Bootstrap**, com foco em boas práticas de front-end, organização de código e responsividade.

---

## Funcionalidades

* Adicionar, editar, concluir e excluir tarefas.
* Cada tarefa possui título, descrição, data/hora e status (concluída ou não).
* Lista dinâmica de tarefas, com estilo diferenciado para itens concluídos (texto tachado).
* Formulário responsivo com campos de texto, data/hora e botões de salvar/cancelar.
* Tratamento de erros: título obrigatório, data/hora válidas e alerta para tarefas duplicadas.

---

## Tecnologias

* **React.js**
* **JavaScript**
* **Bootstrap**

---

## Estrutura do Front-end

```
src/
├─ components/       # Componentes reutilizáveis (Botões, Formulários, Lista)
├─ pages/            # Telas principais (Home, Login, Cadastro de Tarefas)
├─ services/         # Funções para comunicação com Firebase
├─ App.jsx           # Configuração de rotas
└─ index.js          # Entrada da aplicação
```

---

## Como Executar

1. Instalar dependências:

```bash
npm install
```

2. Rodar a aplicação:

```bash
npm run dev
```
