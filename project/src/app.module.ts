import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntrepreneurModule } from './Entrepreneur/entrepreneur.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailService } from './Judge/mail.service';
import { AuthModule } from './Entrepreneur/auth/auth.module';
import { JudgeModule } from './Judge/judge.module';

@Module({
  imports: [
    EntrepreneurModule,JudgeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'ATP',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'nadim.soft.111@gmail.com',
          pass: 'lvue cldb hsnn egfe',
        },
      },
      defaults: {
        from: 'nadim.soft.111@gmail.com',
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
