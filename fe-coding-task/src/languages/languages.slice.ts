import { createSlice } from '@reduxjs/toolkit';
import { enEnLangDto } from './languages.builder';
import { TLangDTO } from './Lang.types';
import { ELangs } from './languages.types';

export type TLangState = {
  lang: TLangDTO['lang'];
  translations: TLangDTO['translations'];
};

const initialState: TLangState = {
  translations: enEnLangDto.translations,
  lang: ELangs.EN,
};

export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
});
