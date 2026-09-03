import type { Locale } from './locale';

/** UI-хром хедера и внутренних страниц (не контент CMS). Контент hero/nav берётся из copy / copyKk. */
export type HeaderChromeMessages = {
  callAria: string;
  openMenu: string;
  closeMenu: string;
  projectsNav: string;
  backHome: string;
};

const ru: HeaderChromeMessages = {
  callAria: 'Позвонить',
  openMenu: 'Открыть меню',
  closeMenu: 'Закрыть меню',
  projectsNav: 'Проекты',
  backHome: 'На главную',
};

const kk: HeaderChromeMessages = {
  callAria: 'Қоңырау шалу',
  openMenu: 'Мәзірді ашу',
  closeMenu: 'Мәзірді жабу',
  projectsNav: 'Жобалар',
  backHome: 'Басты бетке',
};

export const messages: Record<Locale, HeaderChromeMessages> = { ru, kk };

export function t(locale: Locale): HeaderChromeMessages {
  return messages[locale];
}
