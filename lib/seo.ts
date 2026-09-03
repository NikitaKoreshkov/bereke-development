import type { Metadata } from 'next';
import { SITE } from '@/lib/site-data';

export const SEO = {
  siteUrl: SITE.siteUrl,
  brand: 'БЦ BEREKE',
  brandEn: 'BEREKE Business Center',
  org: SITE.name,
  locale: 'ru_KZ',
  localeAlternate: 'kk_KZ',
  language: 'ru-KZ',
  /** Примерно Щепкина 35 / угол Мустафина — Рыскулбекова */
  geo: {
    latitude: 43.204611,
    longitude: 76.877624,
    region: 'KZ-75',
    placename: 'Almaty',
  },
  defaultOgImage: {
    url: '/images/bereke-hero-video-poster.webp',
    width: 1280,
    height: 720,
    alt: 'БЦ BEREKE — бизнес-центр класса А в Алматы, ул. Щепкина 35/1',
  },
  logoOgImage: {
    url: '/og-logo.jpg',
    width: 1200,
    height: 1200,
    alt: 'Логотип БЦ BEREKE — Bereke Development',
  },
  title: {
    default: 'БЦ BEREKE — бизнес-центр класса А в Алматы | купить офис от застройщика',
    template: '%s | БЦ BEREKE Алматы',
  },
  description:
    'БЦ BEREKE — бизнес-центр класса А в Алматы (Бостандыкский р-н, ул. Щепкина 35/1). Прямая продажа офисов от 44 до 500 м² от Bereke Development. Цена от 1 100 000 ₸/м², паркинг 100 мест, сейсмостойкость 9 баллов.',
  shortDescription:
    'Бизнес-центр класса А в Алматы: прямая продажа офисов от 44 м², ул. Щепкина 35/1.',
  keywords: [
    'БЦ BEREKE',
    'BEREKE Business Center',
    'Bereke Development',
    'бизнес-центр Алматы',
    'бизнес-центр класса А Алматы',
    'купить офис Алматы',
    'продажа офисов Алматы',
    'офисы класса А Алматы',
    'коммерческая недвижимость Алматы',
    'офис Бостандыкский район',
    'Щепкина 35/1',
    'офисы от застройщика Алматы',
    'бизнес центр Щепкина',
    'Береке Алматы',
  ],
} as const;

export type FaqItem = {
  question: string;
  questionKk: string;
  answer: string;
  answerKk: string;
};

/** Видимый FAQ + FAQPage schema (контент должен совпадать с разметкой). */
export const SEO_FAQ: readonly FaqItem[] = [
  {
    question: 'Где находится бизнес-центр BEREKE?',
    questionKk: 'BEREKE бизнес-орталығы қайда орналасқан?',
    answer:
      'БЦ BEREKE расположен в Алматы, Бостандыкский район, ул. Щепкина 35/1 (угол улиц Мустафина и Рыскулбекова). Рядом — пр. Аль-Фараби, ТРЦ MEGA и Парк Первого Президента.',
    answerKk:
      'BEREKE БО Алматыда, Бостандық ауданында, Щепкин көшесі, 35/1 мекенжайында орналасқан (Мұстафин және Рысқұлбеков көшелерінің қиылысы). Жақын жерде — Әл-Фараби даңғылы, MEGA СОО және Тұңғыш Президент саябағы.',
  },
  {
    question: 'Какой класс у БЦ BEREKE и какая общая площадь?',
    questionKk: 'BEREKE БО қандай класс және жалпы ауданы қандай?',
    answer:
      'BEREKE — бизнес-центр класса А площадью 14 000 м²: 6 этажей и подземный паркинг. Высота потолков 4,5 м на 1 этаже и 3,5 м на 2–6 этажах.',
    answerKk:
      'BEREKE — А класындағы бизнес-орталық, жалпы ауданы 14 000 м²: 6 қабат және жер асты автотұрағы. Төбе биіктігі 1-қабатта 4,5 м, 2–6 қабаттарда 3,5 м.',
  },
  {
    question: 'Какие офисы можно купить и от какой цены?',
    questionKk: 'Қандай кеңселерді сатып алуға болады және бағасы қандай?',
    answer:
      'Прямая продажа от застройщика: офисы от 44 до 500 м². Стоимость офисов — от 1 100 000 ₸/м² в зависимости от площади и условий оплаты. На 1 этаже — коммерческие помещения под ресторан, шоурум или банк.',
    answerKk:
      'Құрылыс салушыдан тікелей сату: кеңселер 44-тен 500 м²-ге дейін. Кеңсе бағасы — алаң мен төлем шарттарына қарай 1 100 000 ₸/м²-ден бастап. 1-қабатта мейрамхана, шоурум немесе банкке арналған коммерциялық жайлар бар.',
  },
  {
    question: 'Есть ли парковка и какая безопасность в здании?',
    questionKk: 'Автотұрақ бар ма және ғимаратта қауіпсіздік қандай?',
    answer:
      '100 парковочных мест: 50 в подземном паркинге и 50 гостевых на территории. Круглосуточная охрана, видеонаблюдение, контроль доступа и противопожарные системы — в каждом из 4 блоков свой пост охраны.',
    answerKk:
      '100 автотұрақ орны: 50 жер асты және 50 қонақ орны аумақта. Тәулік бойы күзет, бейнебақылау, кіруді бақылау және өртке қарсы жүйелер — 4 блоктың әрқайсысында өз күзет бекеті бар.',
  },
  {
    question: 'Как получить расчёт и консультацию?',
    questionKk: 'Есеп пен кеңесті қалай алуға болады?',
    answer: `Оставьте заявку на сайте, напишите в WhatsApp ${SITE.phone} или на ${SITE.email}. Отдел продаж: ${SITE.addressSales}. Менеджер свяжется в рабочее время и подготовит расчёт под вашу задачу.`,
    answerKk: `Сайтта өтінім қалдырыңыз, WhatsApp ${SITE.phone} немесе ${SITE.email} арқылы жазыңыз. Сату бөлімі: ${SITE.addressSalesKk}. Менеджер жұмыс уақытында хабарласып, тапсырмаңызға сай есеп дайындайды.`,
  },
] as const;

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? SEO.siteUrl : `${SEO.siteUrl}${normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  images,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImages = images?.length
    ? images
    : [SEO.defaultOgImage, SEO.logoOgImage];

  return {
    title,
    description,
    keywords: keywords ?? [...SEO.keywords],
    alternates: {
      canonical: path,
      languages: {
        'ru-KZ': path,
        'x-default': path,
      },
    },
    openGraph: {
      title: `${title} | ${SEO.brand}`,
      description,
      url,
      siteName: SEO.brand,
      locale: SEO.locale,
      alternateLocale: [SEO.localeAlternate],
      type: 'website',
      images: ogImages.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SEO.brand}`,
      description,
      images: [ogImages[0].url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO.siteUrl}/#organization`,
    name: SEO.org,
    alternateName: [SEO.brand, SEO.brandEn, 'Береке Девелопмент', 'БЦ Береке'],
    url: SEO.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo-bereke.png'),
      width: 256,
      height: 256,
    },
    image: absoluteUrl('/logo-bereke.png'),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SITE.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Щепкина 35/1',
      addressLocality: 'Алматы',
      addressRegion: 'Бостандыкский район',
      postalCode: '050043',
      addressCountry: 'KZ',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'sales',
        areaServed: 'KZ',
        availableLanguage: ['Russian', 'Kazakh'],
      },
    ],
  };
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent'],
    '@id': `${SEO.siteUrl}/#business`,
    name: SEO.brand,
    legalName: SEO.org,
    description: SEO.shortDescription,
    url: SEO.siteUrl,
    telephone: SITE.phone,
    email: SITE.email,
    image: [
      absoluteUrl('/logo-bereke.png'),
      absoluteUrl(SEO.defaultOgImage.url),
      absoluteUrl('/images/bereke-exterior-1.jpeg'),
    ],
    logo: absoluteUrl('/logo-bereke.png'),
    priceRange: '₸₸₸',
    currenciesAccepted: 'KZT',
    paymentAccepted: 'Cash, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Щепкина 35/1',
      addressLocality: 'Алматы',
      addressRegion: 'Бостандыкский район',
      postalCode: '050043',
      addressCountry: 'KZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${SEO.geo.latitude},${SEO.geo.longitude}`,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    areaServed: {
      '@type': 'City',
      name: 'Алматы',
    },
    sameAs: [SITE.instagram],
    parentOrganization: { '@id': `${SEO.siteUrl}/#organization` },
  };
}

function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.siteUrl}/#website`,
    name: SEO.brand,
    alternateName: [SEO.org, SEO.brandEn],
    url: SEO.siteUrl,
    inLanguage: ['ru-KZ', 'kk-KZ'],
    publisher: { '@id': `${SEO.siteUrl}/#organization` },
    copyrightHolder: { '@id': `${SEO.siteUrl}/#organization` },
  };
}

function commercialBuildingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CommercialBuilding',
    '@id': `${SEO.siteUrl}/#building`,
    name: SEO.brand,
    alternateName: SEO.brandEn,
    description:
      'Бизнес-центр класса А в Алматы: 14 000 м², 6 этажей, офисы от 44 до 500 м², вентилируемый фасад Laminam, сейсмостойкость 9 баллов.',
    url: SEO.siteUrl,
    image: [
      absoluteUrl(SEO.defaultOgImage.url),
      absoluteUrl('/images/bereke-exterior-1.jpeg'),
      absoluteUrl('/images/bereke-exterior-2.jpeg'),
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Щепкина 35/1',
      addressLocality: 'Алматы',
      addressRegion: 'Бостандыкский район',
      addressCountry: 'KZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO.geo.latitude,
      longitude: SEO.geo.longitude,
    },
    numberOfFloors: 6,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: 14000,
      unitCode: 'MTK',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Подземный паркинг', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Гостевая парковка', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Охрана 24/7', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Центральная вентиляция и кондиционирование', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Высокоскоростные лифты', value: true },
    ],
    slogan: 'Пространство, где бизнес растёт',
    telephone: SITE.phone,
    photo: absoluteUrl('/images/bereke-exterior-1.jpeg'),
  };
}

function offerCatalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SEO.siteUrl}/#offers`,
    name: 'Офисы и коммерческие помещения БЦ BEREKE',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Офисы класса А от 44 м²',
        description: 'Прямая продажа офисов со 2 этажа: от 44 до 500 м², черновая отделка, свободная планировка.',
        url: absoluteUrl('/spaces'),
        priceCurrency: 'KZT',
        price: '1100000',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '1100000',
          priceCurrency: 'KZT',
          unitText: 'м²',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'MTK',
          },
        },
        availability: 'https://schema.org/InStock',
        businessFunction: 'https://schema.org/Sell',
        itemOffered: {
          '@type': 'Product',
          name: 'Офис в БЦ BEREKE',
          category: 'CommercialProperty',
        },
        seller: { '@id': `${SEO.siteUrl}/#organization` },
      },
      {
        '@type': 'Offer',
        name: 'Коммерция 1 этажа',
        description:
          '4 помещения 294 / 379 / 319 / 403 м² под ресторан, кофейню, шоурум, банк. Высота потолков 4,5 м.',
        url: absoluteUrl('/#layouts'),
        priceCurrency: 'KZT',
        price: '2200000',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '2200000',
          priceCurrency: 'KZT',
          unitText: 'м²',
        },
        availability: 'https://schema.org/InStock',
        businessFunction: 'https://schema.org/Sell',
        itemOffered: {
          '@type': 'Product',
          name: 'Коммерческое помещение 1 этажа БЦ BEREKE',
          category: 'CommercialProperty',
        },
        seller: { '@id': `${SEO.siteUrl}/#organization` },
      },
    ],
  };
}

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SEO.siteUrl}/#faq`,
    mainEntity: SEO_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function itemListSpacesJsonLd(
  layouts: { title: string; type: string; area: number; floor: number; image: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SEO.siteUrl}/spaces#list`,
    name: 'Доступные пространства БЦ BEREKE',
    numberOfItems: layouts.length,
    itemListElement: layouts.map((layout, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${layout.title} — ${layout.type}`,
      url: absoluteUrl('/spaces'),
      image: absoluteUrl(layout.image),
      item: {
        '@type': 'Product',
        name: `Офис ${layout.title}`,
        description: `${layout.type}. Площадь ${layout.area} м², этаж ${layout.floor}. БЦ BEREKE, Алматы.`,
        image: absoluteUrl(layout.image),
        category: 'OfficeSpace',
      },
    })),
  };
}

/** Глобальные схемы для корневого layout. */
export function getGlobalJsonLdGraphs() {
  return [
    organizationJsonLd(),
    localBusinessJsonLd(),
    websiteJsonLd(),
    commercialBuildingJsonLd(),
    offerCatalogJsonLd(),
  ];
}

export function getHomeJsonLdGraphs() {
  return [faqJsonLd(), breadcrumbJsonLd([{ name: 'Главная', path: '/' }])];
}

export function getSpacesJsonLdGraphs(
  layouts: { title: string; type: string; area: number; floor: number; image: string }[],
) {
  return [
    breadcrumbJsonLd([
      { name: 'Главная', path: '/' },
      { name: 'Доступные пространства', path: '/spaces' },
    ]),
    itemListSpacesJsonLd(layouts),
  ];
}

export function getDeveloperJsonLdGraphs() {
  return [
    breadcrumbJsonLd([
      { name: 'Главная', path: '/' },
      { name: 'О компании', path: '/developer' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${SEO.siteUrl}/developer#page`,
      name: 'О Bereke Development',
      url: absoluteUrl('/developer'),
      isPartOf: { '@id': `${SEO.siteUrl}/#website` },
      about: { '@id': `${SEO.siteUrl}/#organization` },
      description:
        'Bereke Development — казахстанский девелопер коммерческой недвижимости. Флагманский проект — БЦ BEREKE в Алматы.',
    },
  ];
}

export function getLegalJsonLdGraphs(name: string, path: string) {
  return [
    breadcrumbJsonLd([
      { name: 'Главная', path: '/' },
      { name: name, path },
    ]),
  ];
}

export function getRootMetadata(): Metadata {
  const verification: Metadata['verification'] = {};
  if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  }
  if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) {
    verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  }

  return {
    metadataBase: new URL(SEO.siteUrl),
    applicationName: SEO.brand,
    title: {
      default: SEO.title.default,
      template: SEO.title.template,
    },
    description: SEO.description,
    keywords: [...SEO.keywords],
    authors: [{ name: SEO.org, url: SEO.siteUrl }],
    creator: SEO.org,
    publisher: SEO.org,
    category: 'real estate',
    classification: 'Business Center, Commercial Real Estate, Office Sales',
    alternates: {
      canonical: '/',
      languages: {
        'ru-KZ': '/',
        'x-default': '/',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon-mark.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico?v=3', sizes: 'any' },
        { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
        { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
      shortcut: ['/favicon.ico?v=3'],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      title: SEO.title.default,
      description: SEO.description,
      type: 'website',
      locale: SEO.locale,
      alternateLocale: [SEO.localeAlternate],
      url: SEO.siteUrl,
      siteName: SEO.brand,
      images: [SEO.defaultOgImage, SEO.logoOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'БЦ BEREKE — бизнес-центр класса А в Алматы',
      description: SEO.shortDescription,
      images: [SEO.defaultOgImage.url],
    },
    other: {
      'geo.region': SEO.geo.region,
      'geo.placename': SEO.geo.placename,
      'geo.position': `${SEO.geo.latitude};${SEO.geo.longitude}`,
      ICBM: `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
    },
    ...(Object.keys(verification).length ? { verification } : {}),
  };
}
