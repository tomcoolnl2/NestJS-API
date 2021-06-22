
import { Provider } from '@nestjs/common'
import { prefixesForTranslators } from './translator.decorator'
import { TranslatorService } from './translator.service'


export function createTranslatorProvider(prefix: string): Provider<TranslatorService> {
    return {
        provide: `${TranslatorService.name}${prefix}`,
        useFactory: translator => translator,
        inject: [TranslatorService]
    }
}

export function createTranslatorProviders(): Array<Provider<TranslatorService>> {
    return prefixesForTranslators.map(createTranslatorProvider)
}