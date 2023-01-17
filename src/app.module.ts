// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

// Components
import { UserModule } from '@src/user/user.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: 'mongodb+srv://shop-shoes:bs2zVGdRneIe9wHE@cluster0.i4rykqo.mongodb.net/max?retryWrites=true&w=majority',
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      logging: true,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),
    UserModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
