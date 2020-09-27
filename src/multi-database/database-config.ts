import { EnvironmentService } from '@nsourcery/env';
import { MongoConfig } from './mappings/mongo-config';
import { OracleConfig } from './mappings/oracle-config';
import { PostgresConfig } from './mappings/postgres-config';

export class DatabaseConfig {
  type: string;
  url: string;
  connectString: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;

  constructor(env: EnvironmentService, key: string) {
    const dbType = env.get(`${key}_DB_TYPE`);
    const Instance = {
      postgres: PostgresConfig,
      mongodb: MongoConfig,
      oracle: OracleConfig,
    }[dbType];
    const dbConfig = new Instance(env, key);

    Object.keys(dbConfig).forEach((prop) => (this[prop] = dbConfig[prop]));
  }
}
