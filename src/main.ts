
import * as config from 'config'
import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'


(async () => {
  
	const logger = new Logger('NestApplication')
	const serverConfig = config.get('server')
	
	const PORT = process.env.PORT ?? serverConfig.port
	const APP_NAME = process.env.npm_package_name
	const APP_VERSION = process.env.npm_package_version

	const app = await NestFactory.create(AppModule)

	const options = new DocumentBuilder()
		.setTitle(APP_NAME)
		.setDescription(`${APP_NAME} API`)
		.setVersion(APP_VERSION)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('swagger', app, document)

	await app.listen(PORT)

	logger.log(`API ${APP_NAME} listening on port ${PORT}`)
})()
