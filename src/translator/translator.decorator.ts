
import { Inject } from '@nestjs/common';
import { TranslatorService } from './translator.service';


export const prefixesForTranslators: string[] = new Array<string>()

export function Translator(prefix: string) {

  if (!prefixesForTranslators.includes(prefix)) {
    prefixesForTranslators.push(prefix)
  }

  return Inject(`${TranslatorService.name}${prefix}`)
}