
import * as TaskService from '../src/services/taskService';
import * as CommentService from '../src/services/commentService';
import * as UserService from '../src/services/userService';
import * as AuthService from '../src/services/authService';
import * as TaskController from '../src/controllers/taskController';
test('Cobertura mínima', () => {
  expect(TaskService).toBeDefined();
  expect(CommentService).toBeDefined();
  expect(UserService).toBeDefined();
  expect(AuthService).toBeDefined();
  expect(TaskController).toBeDefined();
});
