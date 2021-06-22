
import * as config from 'config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// local config
const {
    type, 
    host, 
    port, 
    username, 
    password, 
    database, 
    synchronize
} = config.get('db')

// production config
// TODO add AWS database for production
const {
    RDS_HOSTNAME,
    RDS_PORT,
    RDS_USERNAME,
    RDS_PASSWORD,
    RDS_DB_NAME,
    TYPEORM_SYNC
} = process.env

export const typeOrmConfig: TypeOrmModuleOptions = {
    type,
    host: RDS_HOSTNAME ?? host,
    port: RDS_PORT ?? port,
    username: RDS_USERNAME ?? username,
    password: RDS_PASSWORD ?? password,
    database: RDS_DB_NAME ?? database,
    autoLoadEntities: true,
    // TODO when deploying to production for the first time, set this to true. 
    // Afterwards it should always be false.
    synchronize: TYPEORM_SYNC || synchronize
}