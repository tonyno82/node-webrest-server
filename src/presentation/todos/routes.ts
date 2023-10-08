import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImple } from "../../infrastructure/repositories/todo.repository.impl";





export class TodoRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImple( datasource )

        const todoController = new TodosController( todoRepository )

        router.get('/', todoController.getTodos)         
        router.get('/:id', todoController.getTodosbyId)         

        router.post('/', todoController.createTodo)         
        router.put('/:id', todoController.updateTodo)         
        router.delete('/:id', todoController.deleteTodo)         



    return router;
    }
}