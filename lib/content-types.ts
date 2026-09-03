export type SiteSettings = {
  name: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  brochureUrl: string;
  addressBC: string;
  /** Казахский адрес БЦ */
  addressBCKk: string;
  addressSales: string;
  /** Казахский адрес отдела продаж */
  addressSalesKk: string;
  mapQuery: string;
  mapNote: string;
  /** Казахская заметка к карте */
  mapNoteKk: string;
  siteUrl: string;
  logoUrl: string;
};

export type NavItem = {
  id: string;
  label: string;
  /** Казахский текст пункта меню */
  labelKk: string;
  href: string;
  visible: boolean;
  order: number;
};

export type ProjectItem = {
  id: string;
  name: string;
  subtitle: string;
  anchor: string;
  image: string;
  visible: boolean;
  order: number;
};

export type AdvantageItem = {
  id: string;
  title: string;
  titleKk: string;
  text: string;
  textKk: string;
  icon: string;
  visible: boolean;
  order: number;
};

export type StatItem = {
  id: string;
  value: string;
  /** Казахское значение (если отличается от RU) */
  valueKk: string;
  label: string;
  /** Казахская подпись */
  labelKk: string;
  visible: boolean;
  order: number;
};

export type ObjectSpecItem = {
  id: string;
  label: string;
  labelKk: string;
  value: string;
  valueKk: string;
  visible: boolean;
  order: number;
};

export type LayoutItem = {
  id: string;
  area: number;
  floor: number;
  title: string;
  type: string;
  typeKk: string;
  image: string;
  visible: boolean;
  order: number;
};

export type FloorPlanItem = {
  id: string;
  title: string;
  titleKk: string;
  image: string;
  pdf: string;
  visible: boolean;
  order: number;
};

export type ArchitectureImage = {
  id: string;
  alt: string;
  image: string;
  visible: boolean;
  order: number;
};

export type ConstructionUpdateItem = {
  id: string;
  date: string;
  dateKk: string;
  title: string;
  titleKk: string;
  category: string;
  categoryKk: string;
  description: string;
  descriptionKk: string;
  works: string[];
  worksKk: string[];
  photos: string[];
  videos: string[];
  instagramUrl?: string;
  visible: boolean;
  order: number;
};

export type ResidentItem = {
  id: string;
  name: string;
  visible: boolean;
  order: number;
};

export type CalculatorLot = {
  id: string;
  area: number;
  floor: number;
  label: string;
  labelKk: string;
  visible: boolean;
  order: number;
};

export type CalculatorPaymentPercent = 100 | 70 | 50 | 30;

export type CalculatorPriceTier = {
  100: number;
  70: number;
  50: number;
  30: number;
};

export type CalculatorSettings = {
  minArea: number;
  maxArea: number;
  defaultArea: number;
  defaultPaymentPercent: CalculatorPaymentPercent;
  areaMatchDelta: number;
  maxMatchingLots: number;
  presets: number[];
  paymentPercents: CalculatorPaymentPercent[];
  priceTable: {
    under200: CalculatorPriceTier;
    from200to400: CalculatorPriceTier;
    over400: CalculatorPriceTier;
  };
  firstFloorCommercial: {
    units: number;
    pricePerSqm: number;
    purpose: string;
    areasSqm: number[];
    ceilingHeightM: number;
  };
};

export type SiteImages = {
  hero: string;
  heroPoster: string;
  facadeDay: string;
  architecture: string;
  floorPlan: string;
  floorPlanPdf: string;
};

export type SiteVideos = {
  hero: string;
  heroMobile: string;
};

export type SiteCopy = {
  heroEyebrow: string;
  heroLead: string;
  heroLeadAccent: string;
  heroCtaConsultation: string;
  heroCtaBrochure: string;
  heroScrollHint: string;
  prefaceLead: string;
  prefaceBody: string;
  berekeCardBadge: string;
  berekeCardEyebrow: string;
  berekeCardText: string;
  berekeCardCity: string;
  berekeCardStreet: string;
  advantagesSectionLabel: string;
  advantagesTitle: string;
  advantagesLocationEyebrow: string;
  advantagesLocationTitle: string;
  advantagesLocationText: string;
  architectureSectionLabel: string;
  architectureTitle: string;
  architectureP1: string;
  architectureP2: string;
  architectureP3: string;
  architectureHint: string;
  architectureCtaConsultation: string;
  architectureCtaLayouts: string;
  architecturePrevPhoto: string;
  architectureNextPhoto: string;
  architecturePhotoAria: string;
  ctaTitle: string;
  ctaSubtitle: string;
  formConsent: string;
  formNamePlaceholder: string;
  formPhonePlaceholder: string;
  formSubmit: string;
  formCancel: string;
  layoutsSectionLabel: string;
  layoutsTitle: string;
  layoutsSubtitle: string;
  layoutsFirstFloorBadge: string;
  layoutsFirstFloorNote: string;
  floorPlanNote: string;
  floorPlanTypicalLabel: string;
  floorPlanFullCta: string;
  floorPlanTapHint: string;
  imageZoomHint: string;
  layoutsCarouselNote: string;
  layoutsCta: string;
  layoutsSpacesTitle: string;
  layoutsBrand: string;
  layoutsPrevAria: string;
  layoutsNextAria: string;
  layoutsOpenAria: string;
  layoutsCloseAria: string;
  floorPlanPrevAria: string;
  floorPlanNextAria: string;
  floorPlanOpenAria: string;
  floorPlanCloseAria: string;
  floorPlanDialogAria: string;
  calcTitle: string;
  calcStep1Title: string;
  calcStep2Title: string;
  calcStep3Title: string;
  calcStep1Subtitle: string;
  calcStep2Subtitle: string;
  calcStep3Subtitle: string;
  calcAreaAria: string;
  calcTierUnder200: string;
  calcTier200to400: string;
  calcTierOver400: string;
  calcNoLots: string;
  calcSelected: string;
  calcOptional: string;
  calcPaymentTerms: string;
  calcGetExact: string;
  calcSalesDept: string;
  calcBack: string;
  calcNext: string;
  calcStepAria: string;
  calcFloor: string;
  calcMillion: string;
  calcBillion: string;
  calcWhatsappIntro: string;
  calcWhatsappArea: string;
  calcWhatsappPayment: string;
  calcWhatsappEstimate: string;
  calcWhatsappLot: string;
  calcWhatsappPricePerSqm: string;
  developerTitle: string;
  developerSectionLabel: string;
  developerPageTitle: string;
  developerP1: string;
  developerP2: string;
  residentsTitle: string;
  developerCta: string;
  locationTitle: string;
  locationBrandTitle: string;
  locationMapAria: string;
  supportSectionLabel: string;
  supportTitle: string;
  supportSubtitle: string;
  supportCallbackCta: string;
  supportEmailCta: string;
  supportDirectContacts: string;
  callbackSuccess: string;
  footerTagline: string;
  footerDescription: string;
  footerNavLabel: string;
  footerContactsLabel: string;
  footerMaterialsLabel: string;
  footerAddressBcLabel: string;
  footerSalesLabel: string;
  footerBrochureCta: string;
  footerContactsCta: string;
  footerLocationLine: string;
  footerPrivacyLink: string;
  footerLegal: string;
  berekeSectionLabel: string;
  constructionSectionLabel: string;
  constructionTitle: string;
  constructionSubtitle: string;
  constructionEmpty: string;
  constructionInstagramCta: string;
  constructionViewCta: string;
  constructionOpenInstagram: string;
  constructionStageLabel: string;
  constructionWorksLabel: string;
  constructionVideoLabel: string;
  constructionPhotosLabel: string;
  constructionMediaVideo: string;
  constructionMediaPhoto: string;
  constructionMediaVideoSoon: string;
  constructionMediaPhotoSoon: string;
  projectsSectionLabel: string;
  projectCta: string;
};

export type SectionKey =
  | 'hero'
  | 'bereke'
  | 'advantages'
  | 'architecture'
  | 'layouts'
  | 'contacts'
  | 'construction'
  | 'footer'
  | 'developer'
  | 'projects';

export type SectionVisibility = Record<SectionKey, boolean>;

export type SiteContentData = {
  site: SiteSettings;
  copy: SiteCopy;
  /** Казахские тексты (те же ключи, что у copy) */
  copyKk: SiteCopy;
  nav: NavItem[];
  projects: ProjectItem[];
  advantages: AdvantageItem[];
  stats: StatItem[];
  objectSpecs: ObjectSpecItem[];
  layouts: LayoutItem[];
  floorPlans: FloorPlanItem[];
  architectureGallery: ArchitectureImage[];
  constructionUpdates: ConstructionUpdateItem[];
  residents: ResidentItem[];
  calculatorLots: CalculatorLot[];
  calculator: CalculatorSettings;
  images: SiteImages;
  videos: SiteVideos;
  sections: SectionVisibility;
};

export const SECTION_META: {
  key: SectionKey;
  title: string;
  description: string;
}[] = [
  { key: 'hero', title: 'Hero', description: 'Главный экран: тексты и видео' },
  { key: 'bereke', title: 'BEREKE', description: 'Блок проекта и характеристики' },
  { key: 'projects', title: 'Проекты', description: 'Карточки проектов' },
  { key: 'advantages', title: 'Преимущества', description: 'Тексты и список преимуществ' },
  { key: 'architecture', title: 'Архитектура', description: 'Тексты и галерея' },
  { key: 'layouts', title: 'Планировки', description: 'Пространства, планы, калькулятор' },
  { key: 'contacts', title: 'Локация и заявка', description: 'Контакты, CTA, адреса' },
  { key: 'construction', title: 'Ход строительства', description: 'Обновления со стройки' },
  { key: 'developer', title: 'О компании', description: 'Тексты и резиденты' },
  { key: 'footer', title: 'Подвал', description: 'Юридический текст и ссылки' },
];
