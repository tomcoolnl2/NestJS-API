
import { Injectable, Scope } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n';


@Injectable({
  scope: Scope.TRANSIENT
})
export class TranslatorService {

  constructor(private readonly i18n: I18nService) {}

  async translate(key: string, args: unknown) {

    const formattedMessage = await this.i18n.translate(`response.${key}`, { args })

    console.log(formattedMessage)
  }
}
