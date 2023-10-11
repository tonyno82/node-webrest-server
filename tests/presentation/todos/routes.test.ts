
import request from 'supertest'
import { testServer } from '../../testServer'
import { prisma } from '../../../src/data/postgres/index';


describe('routes.ts', () => { 

    beforeAll(async() => {
        await testServer.start()
    })
    
    beforeEach(async() => {
        await prisma.todo.deleteMany({})
    })
    
    afterEach(async() => {
        await prisma.todo.deleteMany({})
    })
    
    afterAll(() => {
        testServer.close()
    })
    
    const todo1 = {text: 'Hola mundo 1'}
    const todo2 = {text: 'Hola mundo 2'}
    
    const todoId = 9999

    test('should return TODOs api/todos', async() => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200);
        
        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBe(2)
        expect(body[0].text).toBe(todo1.text)
        expect(body[1].text).toBe(todo2.text)
        expect(body[0].completedAt).toBeNull()

    })

    test('should return a TODO api/todos/:id', async() => { 

        /** 
         * solucion de Fernando
         * const todo = await prisma.todos.create({data: todo})
         * 
         * const {body} = await request(testServer.app)
         *  .get(`/api/todos/${todo.id}`)
         *  .expect(200)
         * 
         * expect(body).toEqual({
         * id: todo.id
         * text: todo.text
         * completedAt: todo.completedAt
         * })
        */
        
        await prisma.todo.createMany({
            data: [todo1, todo2]
        })
        const bodyTodos = await request(testServer.app)
            .get('/api/todos')
            .expect(200);
        
        const {id} = bodyTodos.body[0]

        const {body} = await request(testServer.app)
            .get(`/api/todos/${id}`)
            .expect(200);

        expect(body).toEqual({
            id: id,
            text: todo1.text ,
            completedAt: null
        })
     })

     test('should return a 404 NotFound api/todo/:id', async() => {


        const {body} = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${todoId} not found` })

     })

     test('should return a new Todo Api/todos', async() => {

        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })


     })

     test('should return an error if text is not present api/todos', async() => {

        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400)

        expect(body).toEqual({ error: 'text property is required' })


     })

     test('should return an error if text is not valid api/todos', async() => {

        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send({text: ""})
            .expect(400)

        expect(body).toEqual({ error: 'text property is required' })


     })

     test('should return an updated TODO api/todos/:id', async() => {

        const todo = await prisma.todo.create({data: todo1})

        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({text: "Hola mundo Update", completedAt: '2023-10-21'})
            .expect(200)

        expect(body).toEqual(
            {
                id: todo.id,
                text: 'Hola mundo Update',
                completedAt: '2023-10-21T00:00:00.000Z'
            }
        )
     })


     test('should return an updated TODO only the date api/todos/:id', async() => {

        const todo = await prisma.todo.create({data: todo1})

        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({completedAt: '2023-10-21'})
            .expect(200)

        expect(body).toEqual(
            {
                id: todo.id,
                text: todo1.text,
                completedAt: '2023-10-21T00:00:00.000Z'
            }
        )
     })
     test('should return 404 if TODO not found api/todos/:id', async() => {



        const {body} = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({text: "Hola mundo Update", completedAt: '2023-10-21'})
            .expect(404)

        expect(body).toEqual( { error: `Todo with id ${todoId} not found` })
     })

     test('should delete a TODO api/todos/:id', async() => {

        const todo = await prisma.todo.create({data: todo1})

        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200)
        
        expect(body).toEqual({
            id: todo.id,
            text: todo.text, 
            completedAt: null
        })
     })

     test('should return 404 if delete a TODO not found api/todos/:id', async() => {


        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(404)
        

        expect(body).toEqual({error: `Todo with id ${todoId} not found`})
     })

 })