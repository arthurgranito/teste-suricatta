const request = require('supertest');
const app = require('./server');
const Task = require('./task');

jest.mock('./task');

describe('Tasks API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { _id: '1', task: 'Task 1', checked: false },
        { _id: '2', task: 'Task 2', checked: true }
      ];

      Task.find.mockResolvedValueOnce(mockTasks); // corrigido

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTasks);
    });

    it('should filter tasks by completed status', async () => {
      const completedTasks = [{ _id: '2', task: 'Task 2', checked: true }];

      Task.find.mockResolvedValueOnce(completedTasks); // corrigido

      const response = await request(app).get('/api/tasks?checked=true');

      expect(response.status).toBe(200);
      expect(Task.find).toHaveBeenCalledWith({ checked: true });
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        task: 'Nova tarefa',
        description: 'Descrição da tarefa'
      };

      const savedTask = {
        _id: '3',
        ...newTask,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Task.prototype.save = jest.fn().mockResolvedValueOnce(savedTask);

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body.task).toBe(newTask.task);
    });

    it('should return 400 for invalid task data', async () => {
      Task.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Validation error'));

      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'sem título' });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const updatedTask = {
        _id: '1',
        task: 'Atualizado',
        checked: true
      };

      Task.findByIdAndUpdate.mockResolvedValueOnce(updatedTask);

      const response = await request(app)
        .put('/api/tasks/1')
        .send({ task: 'Atualizado', checked: true });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTask);
    });

    it('should return 404 for non-existent task', async () => {
      Task.findByIdAndUpdate.mockResolvedValueOnce(null);

      const response = await request(app)
        .put('/api/tasks/999')
        .send({ task: 'Inexistente' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      Task.findByIdAndDelete.mockResolvedValueOnce({ _id: '1' });

      const response = await request(app).delete('/api/tasks/1');

      expect(response.status).toBe(200);
      expect(response.body.mensagem).toBe('Tarefa deletada com sucesso');
    });

    it('should return 404 for non-existent task', async () => {
      Task.findByIdAndDelete.mockResolvedValueOnce(null);

      const response = await request(app).delete('/api/tasks/999');

      expect(response.status).toBe(404);
    });
  });
});
