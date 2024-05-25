import express from "express";
import {
  createNote,
  getTodosByUserId,
  getTodoByTodoId,
  updateTodoByTodoId,
  deleteTodoByTodoId,
} from "../Controller/todoController.js";
export const noteRouter = express.Router();

noteRouter.post("/api/createNote/:userId", createNote);
noteRouter.get("/api/notes/:userId", getTodosByUserId); // multiple todos
noteRouter.get("/api/note/:noteId", getTodoByTodoId); // single todo
noteRouter.put("/api/update/note/:noteId", updateTodoByTodoId);
noteRouter.delete("/api/delete/note/:noteId", deleteTodoByTodoId);
