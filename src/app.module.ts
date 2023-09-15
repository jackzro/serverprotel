import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './users/roles.guard';
import { UsersModule } from './users/users.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CalldurationModule } from './callduration/callduration.module';
import { SipclientModule } from './sipclient/sipclient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    UsersModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    CalldurationModule,
    SipclientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
