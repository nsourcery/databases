import { EnvironmentService } from '@nsourcery/env';

export class OracleConfig {
  type: string = 'oracle';
  connectString: string;
  username: string;
  password: string;
  synchronize: boolean = false;
  autoLoadEntities: boolean = true;

  constructor(env: EnvironmentService, key: string) {
    this.connectString = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${env.get(
      `${key}_HOST`,
    )})(PORT=${env.get(
      `${key}_PORT`,
    )}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${env.get(
      `${key}_DATABASE`,
    )})))`;
    this.username = env.get(`${key}_USERNAME`);
    this.password = env.get(`${key}_PASSWORD`);
    this.synchronize =
      env.get(`${key}_SYNC`) === 'true' &&
      env.get('NODE_ENV') === 'development';
  }
}
