import { EnvironmentService } from '@nsourcery/env';

export class MongoConfig {
  type: string = 'mongodb';
  url: string;
  synchronize: boolean = false;
  autoLoadEntities: boolean = true;
  useUnifiedTopology: boolean = true;
  useNewUrlParser: boolean = true;

  constructor(env: EnvironmentService, key: string) {
    this.url = env.get(`${key}_URL`);
    this.synchronize =
      env.get(`${key}_SYNC`) === 'true' &&
      env.get('NODE_ENV') === 'development';
  }
}
