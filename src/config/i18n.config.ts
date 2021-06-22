 
import * as path from 'path'
import { I18nJsonParser, I18nOptions } from 'nestjs-i18n'

 
export const i18nConfig: I18nOptions = {
    fallbackLanguage: 'en',
    parser: I18nJsonParser,
    parserOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: process.env.NODE_ENV === 'development'
    }
}