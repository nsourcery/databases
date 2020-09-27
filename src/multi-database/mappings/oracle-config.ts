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
      `${key}_DB_HOST`,
    )})(PORT=${env.get(
      `${key}_DB_PORT`,
    )}))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=${env.get(
      `${key}_DB_DATABASE`,
    )})))`;
    this.username = env.get(`${key}_DB_USERNAME`);
    this.password = env.get(`${key}_DB_PASSWORD`);
    this.synchronize =
      env.get(`${key}_DB_SYNC`) === 'true' && env.get('SYNCHRONIZE') === 'true';
  }
}
