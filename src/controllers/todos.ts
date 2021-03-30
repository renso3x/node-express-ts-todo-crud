import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  // type casting
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  return res.status(201).json({ message: 'Created the todo.' })
}

export const getTodos: RequestHandler = (req, res, next) => {
  return res.status(200).json({ todos: TODOS })
}
// generic type to get the params
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as {text:string}).text;

  const todoIndex = TODOS.findIndex(todo => todo.id == todoId);

  if (todoIndex < 0) {
    throw new Error("Couldn't find todo!")
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'Update!', updateTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id == todoId);

  if (todoIndex < 0) {
    throw new Error("Couldn't find todo!")
  }

  TODOS.splice(todoIndex, 1);

  return res.json({ message: 'Todo Deleted!'});
}