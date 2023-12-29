import { ELangs } from './languages.types';
import { enENTranslate } from './en-EN';
import { TLangDTO } from './Lang.types';

export const enEnLangDto: TLangDTO = {
  lang: ELangs.EN,
  translations: enENTranslate,
};
