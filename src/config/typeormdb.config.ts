import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfigT {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASET'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      //   ssl: { rejectUnauthorized: false },
      // logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  name: 'sekolah',
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfigT.getOrmConfig(configService),
  inject: [ConfigService],
};
