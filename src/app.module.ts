
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { I18nModule } from 'nestjs-i18n'
import { typeOrmConfig } from './config/typeorm.config'
import { i18nConfig } from './config/i18n.config'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'
import { TranslatorModule } from './translator/translator.module';


@Module({
	imports: [
		I18nModule.forRoot(i18nConfig),
		TypeOrmModule.forRoot(typeOrmConfig),
		AuthModule,
		TasksModule
	]
})
export class AppModule {}
