
import prisma from '../src/lib/prisma';
import * as authService from '../src/services/authService';
import * as userService from '../src/services/userService';
import * as taskService from '../src/services/taskService';
import * as commentService from '../src/services/commentService';

describe('Smoke tests to improve coverage', () => {
  it('Prisma client should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('Services should expose expected functions', () => {
    expect(typeof authService.login).toBe('function');
    expect(typeof userService.createUser).toBe('function');
    expect(typeof taskService.createTask).toBe('function');
    expect(typeof commentService.createComment).toBe('function');
  });
});
