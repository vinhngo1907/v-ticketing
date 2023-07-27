import ORMConfig from 'ormconfig';
import { DataSource } from 'typeorm';

export type PostgresConnectionOptions = {
    /**
   * @description Use for testing/debugging. This will delete your data after the tests
   */
    dropSchema?: boolean;

    /**
     * @description Automatically run migrations before the tests
     */
    migrationsRun?: boolean;
}

const dataSourceOptions = {
    ...ORMConfig
};