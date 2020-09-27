import { Test, TestingModule } from '@nestjs/testing';
import { MockEnvironmentService } from '@nsourcery/common';
import { EnvironmentService } from '@nsourcery/env';
import { DatabaseConfig } from './database-config';

describe(DatabaseConfig.name, () => {
  let instance: DatabaseConfig;
  let env: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EnvironmentService, useClass: MockEnvironmentService },
      ],
    }).compile();
    instance = module.get(EnvironmentService);
    env = module.get(EnvironmentService);
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  it('should have dependencies defined', () => {
    expect(env).toBeDefined();
  });

  it('should return postgres db type', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'postgres');
    instance = new DatabaseConfig(env, 'postgres');
    expect(instance.type).toBe('postgres');
  });

  it('should return postgres specific properties', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'postgres');
    instance = new DatabaseConfig(env, 'postgres');
    expect(instance).toHaveProperty('url');
    expect(instance).toHaveProperty('type');
    expect(instance).toHaveProperty('synchronize');
    expect(instance).toHaveProperty('autoLoadEntities');

    expect(instance).not.toHaveProperty('username');
    expect(instance).not.toHaveProperty('password');
    expect(instance).not.toHaveProperty('connectString');
    expect(instance).not.toHaveProperty('useNewUrlParser');
    expect(instance).not.toHaveProperty('useUnifiedTopology');
  });

  it('should return mongodb db type', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'mongodb');
    instance = new DatabaseConfig(env, 'mongodb');
    expect(instance.type).toBe('mongodb');
  });

  it('should return mongodb specific properties', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'mongodb');
    instance = new DatabaseConfig(env, 'mongodb');
    expect(instance).toHaveProperty('url');
    expect(instance).toHaveProperty('type');
    expect(instance).toHaveProperty('synchronize');
    expect(instance).toHaveProperty('autoLoadEntities');
    expect(instance).toHaveProperty('useNewUrlParser');
    expect(instance).toHaveProperty('useUnifiedTopology');

    expect(instance).not.toHaveProperty('connectString');
    expect(instance).not.toHaveProperty('username');
    expect(instance).not.toHaveProperty('password');
  });

  it('should return oracle db type', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'oracle');
    instance = new DatabaseConfig(env, 'oracle');
    expect(instance.type).toBe('oracle');
  });

  it('should return oracle specific properties', () => {
    jest.spyOn(env, 'get').mockImplementation((k) => 'oracle');
    instance = new DatabaseConfig(env, 'oracle');
    expect(instance).toHaveProperty('connectString');
    expect(instance).toHaveProperty('type');
    expect(instance).toHaveProperty('username');
    expect(instance).toHaveProperty('password');
    expect(instance).toHaveProperty('synchronize');
    expect(instance).toHaveProperty('autoLoadEntities');

    expect(instance).not.toHaveProperty('url');
    expect(instance).not.toHaveProperty('useNewUrlParser');
    expect(instance).not.toHaveProperty('useUnifiedTopology');
  });
});
