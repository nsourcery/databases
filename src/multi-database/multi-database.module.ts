import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentModule, EnvironmentService } from '@nsourcery/env';
import { DatabaseConfig } from './database-config';

@Module({})
export class MultiDatabaseModule {
  static fromEnvironmentKeys(keys: Array<string>): DynamicModule {
    return {
      module: MultiDatabaseModule,
      imports: [
        EnvironmentModule,
        ...keys.map((key, i) =>
          TypeOrmModule.forRootAsync({
            useFactory: (env: EnvironmentService) =>
              new DatabaseConfig(env, key) as TypeOrmModuleOptions,
            inject: [EnvironmentService],
            name:
              keys.length > 1 && i >= 1
                ? `${key.toLowerCase()}Conn`
                : undefined,
          }),
        ),
      ],
    };
  }
}
