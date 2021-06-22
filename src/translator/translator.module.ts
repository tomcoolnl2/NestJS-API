
import { DynamicModule } from '@nestjs/common'
import { TranslatorService } from './translator.service'
import { createTranslatorProviders } from './translator.providers'


export class TranslatorModule {

  static forRoot(): DynamicModule {

      const prefixedLoggerProviders = createTranslatorProviders()

      return {
          module: TranslatorModule,
          providers: [TranslatorService, ...prefixedLoggerProviders],
          exports: [TranslatorService, ...prefixedLoggerProviders]
      }
  }
}
