export const SITE = {
  name: 'Bereke Development',
  phone: '+7 775 350 9999',
  phoneHref: 'tel:+77753509999',
  whatsapp: '77753509999',
  whatsappHref: 'https://wa.me/77753509999',
  email: 'bcbereke@gmail.com',
  instagram: 'https://instagram.com/bc.bereke',
  instagramHandle: '@bc.bereke',
  brochureUrl: '/documents/bereke-brochure.pdf',
  addressBC: 'г. Алматы, Бостандыкский район, ул. Щепкина 35/1',
  addressBCKk: 'Алматы қ., Бостандық ауданы, Щепкин көшесі, 35/1',
  addressSales: 'г. Алматы, ул. Щепкина 35Б, ТД Qaratau, 1 этаж',
  addressSalesKk: 'Алматы қ., Щепкин көшесі, 35Б, «Qaratau» Сауда үйі, 1-қабат',
  mapQuery: 'Алматы, Бостандыкский район, ул. Щепкина 35/1',
  mapNote: 'угол улиц Мустафина и Рыскулбекova',
  mapNoteKk: 'Мұстафин және Рысқұлбеков көшелерінің қиылысы',
  siteUrl: 'https://bc-bereke.kz',
  logoUrl: '/logo-bereke.webp',
} as const;

export function whatsappMessageHref(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { label: 'BEREKE', labelKk: 'BEREKE', href: '#bereke' },
  { label: 'Преимущества', labelKk: 'Артықшылықтар', href: '#advantages' },
  { label: 'Архитектура', labelKk: 'Сәулет', href: '#architecture' },
  { label: 'Локация', labelKk: 'Орналасуы', href: '#contacts' },
  { label: 'Планировки', labelKk: 'Жоспарлар', href: '#layouts' },
] as const;

/** [МЕСТО ПОД РАСШИРЕНИЕ] — переключатель проектов в шапке */
export const FUTURE_PROJECTS: { id: string; name: string }[] = [];

export const PROJECTS = [
  {
    id: 'bereke',
    name: 'BEREKE',
    subtitle: 'Бизнес-центр класса А ул. Щепкина 35/1, Алматы',
    anchor: '#architecture',
    image: '/images/bereke-exterior-1.jpeg',
  },
] as const;

/** Ход строительства — тестовые обновления; медиа подставлять по мере публикаций */
export type ConstructionUpdate = {
  id: string;
  date: string;
  dateKk: string;
  title: string;
  titleKk: string;
  category: string;
  categoryKk: string;
  description: string;
  descriptionKk: string;
  works: readonly string[];
  worksKk: readonly string[];
  photos?: readonly string[];
  videos?: readonly string[];
  instagramUrl?: string;
};

export const CONSTRUCTION_UPDATES: ConstructionUpdate[] = [
  {
    id: '2025-03-site',
    date: 'Март 2025',
    dateKk: 'Наурыз 2025',
    title: 'Подготовка площадки',
    titleKk: 'Алаңды дайындау',
    category: 'Земляные работы',
    categoryKk: 'Жер жұмыстары',
    description:
      'Расчистка территории, организация строительного городка и подготовка котлована под плитный фундамент БЦ BEREKE.',
    descriptionKk:
      'Аумақты тазалау, құрылыс қалашығын ұйымдастыру және BEREKE БО плиталы іргетасы үшін котлован дайындау.',
    works: [
      'Выполнили разметку участка',
      'Организовали строительный городок',
      'Начали выемку грунта под котлован',
      'Подготовили временные дороги и ограждения',
    ],
    worksKk: [
      'Учаскеге белгі салынды',
      'Құрылыс қалашығы ұйымдастырылды',
      'Котлован үшін топырақ қазу басталды',
      'Уақытша жолдар мен қоршаулар дайындалды',
    ],
  },
  {
    id: '2025-04-foundation',
    date: 'Апрель 2025',
    dateKk: 'Сәуір 2025',
    title: 'Фундамент',
    titleKk: 'Іргетас',
    category: 'Монолитные работы',
    categoryKk: 'Монолитті жұмыстар',
    description:
      'Устройство плитного фундамента с расчётом на сейсмическую нагрузку до 9 баллов. Армирование и заливка бетона.',
    descriptionKk:
      '9 балға дейінгі сейсмикалық жүктемеге есептелген плиталы іргетасты орнату. Арматуралау және бетон құю.',
    works: [
      'Смонтировали опалубку фундаментной плиты',
      'Выполнили армирование каркаса',
      'Залили бетон и провели уход за конструкцией',
      'Провели геодезический контроль',
    ],
    worksKk: [
      'Іргетас плитасының қалыбы орнатылды',
      'Қаңқа арматурасы жасалды',
      'Бетон құйылып, конструкция күтімі жүргізілді',
      'Геодезиялық бақылау жүргізілді',
    ],
  },
  {
    id: '2025-05-frame-1',
    date: 'Май 2025',
    dateKk: 'Мамыр 2025',
    title: 'Каркас 1–2 этаж',
    titleKk: '1–2 қабат қаңқасы',
    category: 'Монолитный каркас',
    categoryKk: 'Монолитті қаңқа',
    description:
      'Возведение монолитного железобетонного каркаса первых двух этажей. Формирование несущей системы здания.',
    descriptionKk:
      'Алғашқы екі қабаттың монолитті темірбетон қаңқасын тұрғызу. Ғимараттың көтергіш жүйесін қалыптастыру.',
    works: [
      'Смонтировали колонны 1 этажа',
      'Залили перекрытия 1–2 этажей',
      'Выставили вертикальные оси блоков',
      'Продолжили набор прочности бетона',
    ],
    worksKk: [
      '1-қабат бағандары орнатылды',
      '1–2 қабат жабындары құйылды',
      'Блоктардың тік осьтері түзетілді',
      'Бетон беріктігін жинау жалғасты',
    ],
  },
  {
    id: '2025-06-frame-2',
    date: 'Июнь 2025',
    dateKk: 'Маусым 2025',
    title: 'Каркас 3–4 этаж',
    titleKk: '3–4 қабат қаңқасы',
    category: 'Монолитный каркас',
    categoryKk: 'Монолитті қаңқа',
    description:
      'Продолжение монолитных работ: колонны и перекрытия 3–4 этажей. Синхронизация работ по четырём блокам.',
    descriptionKk:
      'Монолитті жұмыстардың жалғасы: 3–4 қабат бағандары мен жабындары. Төрт блок бойынша жұмыстарды үйлестіру.',
    works: [
      'Возвели колонны 3 этажа',
      'Залили перекрытия 3–4 этажей',
      'Сверили отметки между блоками',
      'Подготовили зоны под инженерные шахты',
    ],
    worksKk: [
      '3-қабат бағандары тұрғызылды',
      '3–4 қабат жабындары құйылды',
      'Блоктар арасындағы белгілер салыстырылды',
      'Инженерлік шахта аймақтары дайындалды',
    ],
  },
  {
    id: '2025-07-frame-3',
    date: 'Июль 2025',
    dateKk: 'Шілде 2025',
    title: 'Каркас 5–6 этаж',
    titleKk: '5–6 қабат қаңқасы',
    category: 'Монолитный каркас',
    categoryKk: 'Монолитті қаңқа',
    description:
      'Завершение несущего каркаса верхних этажей. Формирование контура кровли и технических зон.',
    descriptionKk:
      'Жоғарғы қабаттардың көтергіш қаңқасын аяқтау. Шатыр контуры мен техникалық аймақтарды қалыптастыру.',
    works: [
      'Залили перекрытия 5–6 этажей',
      'Смонтировали каркас под кровлю',
      'Подготовили лифтовые шахты',
      'Закрыли контур монолитных работ',
    ],
    worksKk: [
      '5–6 қабат жабындары құйылды',
      'Шатырға арналған қаңқа орнатылды',
      'Лифт шахталары дайындалды',
      'Монолитті жұмыстар контуры жабылды',
    ],
  },
  {
    id: '2025-08-facade',
    date: 'Август 2025',
    dateKk: 'Тамыз 2025',
    title: 'Фасадные работы',
    titleKk: 'Қасбет жұмыстары',
    category: 'Фасад и витражи',
    categoryKk: 'Қасбет пен витраждар',
    description:
      'Монтаж вентилируемого фасада из неокерамогранита Laminam и подготовка панорамных витражей.',
    descriptionKk:
      'Laminam неокерамогранитінен желдетпелі қасбетті монтаждау және панорамалық витраждарды дайындау.',
    works: [
      'Смонтировали подсистему фасада',
      'Начали облицовку панелями Laminam',
      'Подготовили узлы под витражное остекление',
      'Выполнили герметизацию стыков',
    ],
    worksKk: [
      'Қасбет ішкі жүйесі орнатылды',
      'Laminam панельдерімен қаптау басталды',
      'Витражды шынылау түйіндері дайындалды',
      'Жіктерді герметизациялау жүргізілді',
    ],
  },
  {
    id: '2025-09-engineering',
    date: 'Сентябрь 2025',
    dateKk: 'Қыркүйек 2025',
    title: 'Инженерия',
    titleKk: 'Инженерия',
    category: 'Инженерные сети',
    categoryKk: 'Инженерлік желілер',
    description:
      'Прокладка центральных систем вентиляции, кондиционирования и электроснабжения по этажам.',
    descriptionKk:
      'Қабаттар бойынша орталық желдету, кондиционерлеу және электрмен жабдықтау жүйелерін тарту.',
    works: [
      'Смонтировали магистрали вентиляции',
      'Развели силовые и слаботочные сети',
      'Установили теплообменные модули',
      'Подготовили узлы учёта и автоматики',
    ],
    worksKk: [
      'Желдету магистральдары орнатылды',
      'Күштік және әлсізток желілері тартылды',
      'Жылу алмасу модульдері орнатылды',
      'Есепке алу және автоматика түйіндері дайындалды',
    ],
  },
  {
    id: '2025-10-interior',
    date: 'Октябрь 2025',
    dateKk: 'Қазан 2025',
    title: 'Внутренняя отделка',
    titleKk: 'Ішкі әрлеу',
    category: 'Общественные зоны',
    categoryKk: 'Қоғамдық аймақтар',
    description:
      'Отделка ресепшен-зон, лифтовых холлов и общих пространств: травертин, дерево, металл, свет.',
    descriptionKk:
      'Ресепшен аймақтарын, лифт холлын және ортақ кеңістіктерді әрлеу: травертин, ағаш, металл, жарық.',
    works: [
      'Выполнили черновую отделку холлов',
      'Смонтировали декоративные панели',
      'Установили дизайнерское освещение',
      'Подготовили ресепшен к финишу',
    ],
    worksKk: [
      'Холдардың қарапайым әрлеуі жасалды',
      'Декоративті панельдер орнатылды',
      'Дизайнерлік жарықтандыру қойылды',
      'Ресепшен финишке дайындалды',
    ],
  },
  {
    id: '2025-11-parking',
    date: 'Ноябрь 2025',
    dateKk: 'Қараша 2025',
    title: 'Паркинг и благоустройство',
    titleKk: 'Автотұрақ пен абаттандыру',
    category: 'Территория',
    categoryKk: 'Аумақ',
    description:
      'Работы по подземному паркингу на 50 мест и гостевой парковке на территории. Благоустройство периметра.',
    descriptionKk:
      '50 орындық жер асты автотұрағы және аумақтағы қонақ тұрағы бойынша жұмыстар. Периметрді абаттандыру.',
    works: [
      'Завершили разметку парковочных мест',
      'Смонтировали системы безопасности паркинга',
      'Подготовили гостевую зону на 50 мест',
      'Начали благоустройство территории',
    ],
    worksKk: [
      'Тұрақ орындарының белгіленуі аяқталды',
      'Автотұрақ қауіпсіздік жүйелері орнатылды',
      '50 орындық қонақ аймағы дайындалды',
      'Аумақты абаттандыру басталды',
    ],
  },
];

export const ADVANTAGES = [
  {
    title: 'Сейсмостойкость 9 баллов',
    titleKk: '9 балдық сейсмикалық төзімділік',
    text: 'Монолитный железобетонный каркас, расчёт по СНиП РК',
    textKk: 'Монолитті темірбетон қаңқа, ҚР ҚНжЕ бойынша есептелген',
    icon: 'shield',
  },
  {
    title: 'Премиальный фасад',
    titleKk: 'Премиум қасбет',
    text: 'Вентилируемый фасад из неокерамогранита Laminam, панорамные витражи от пола до потолка со сложной системой открывания',
    textKk:
      'Laminam неокерамогранитінен жасалған желдетпелі қасбет, еденнен төбеге дейінгі панорамалық витраждар және күрделі ашылу жүйесі',
    icon: 'building',
  },
  {
    title: 'Современная инженерия',
    titleKk: 'Заманауи инженерия',
    text: 'Центральные системы вентиляции и кондиционирования, теплообменные модули с индивидуальным контролем микроклимата в каждом помещении',
    textKk:
      'Орталық желдету және кондиционерлеу жүйелері, әр бөлмеде микроклиматты жеке басқаратын жылу алмасу модульдері',
    icon: 'engineering',
  },
  {
    title: '8 высокоскоростных лифтов',
    titleKk: '8 жоғары жылдамдықты лифт',
    text: 'В каждом из 4 блоков своя группа лифтов. Никаких очередей в часы пик',
    textKk: '4 блоктың әрқайсысында өз лифт тобы бар. Қарбалас сағаттарда кезек болмайды',
    icon: 'elevator',
  },
  {
    title: 'Безопасность 24/7',
    titleKk: 'Қауіпсіздік 24/7',
    text: 'Круглосуточная охрана, видеонаблюдение, контроль доступа, противопожарные системы. В каждом блоке собственный пост охраны',
    textKk:
      'Тәулік бойы күзет, бейнебақылау, кіруді бақылау, өртке қарсы жүйелер. Әр блокта өз күзет бекеті қарастырылған',
    icon: 'security',
  },
  {
    title: '100 парковочных мест',
    titleKk: '100 автотұрақ орны',
    text: '50 машино-мест в подземном паркинге + 50 гостевых на территории. Парковка для топ-менеджеров, сотрудников и клиентов и вашей клиентов',
    textKk:
      'Жер асты автотұрағында 50 орын + аумақта 50 қонақ орны. Топ-менеджерлерге, қызметкерлер мен клиенттеріңізге арналған автотұрақ',
    icon: 'parking',
  },
  {
    title: 'Профессиональная управляющая компания',
    titleKk: 'Кәсіби басқарушы компания',
    text: 'Сервис, обслуживание здания и поддержка резидентов — на нас. Мы сами сдадим ваш офис: вы занимаетесь бизнесом, мы — комфортом',
    textKk:
      'Сервис, ғимаратты күтіп ұстау және резиденттерді қолдау — біздің мойнымызда. Кеңсеңізді өзіміз жалға береміз: сіз бизнеспен айналысасыз, ал біз жайлылықты қамтамасыз етеміз',
    icon: 'service',
  },
  {
    title: 'Собственная ресепшен-зона в каждом блоке',
    titleKk: 'Әр блокта өз ресепшен аймағы',
    text: 'Управляющая сервисная компания встречает гостей и создаёт деловую атмосферу с первых секунд',
    textKk:
      'Басқарушы сервистік компания қонақтарды қарсы алып, алғашқы секундтардан бастап іскерлік атмосфера қалыптастырады',
    icon: 'reception',
  },
] as const;

export const STATS = [
  {
    value: '14 000 м²',
    valueKk: '14 000 м²',
    label: 'общая площадь бизнес-центра',
    labelKk: 'бизнес-орталықтың жалпы ауданы',
  },
  {
    value: '6 этажей + подземный паркинг',
    valueKk: '6 қабат + жер асты автотұрағы',
    label: '',
    labelKk: '',
  },
  {
    value: 'От 44 до 500 м²',
    valueKk: '44-тен 500 м²-ге дейін',
    label: 'доступные площади офисов',
    labelKk: 'қолжетімді кеңсе алаңдары',
  },
  {
    value: '4,5 м / 3,5 м',
    valueKk: '4,5 м / 3,5 м',
    label: 'высота потолков (1 этаж / 2-6 этажи)',
    labelKk: 'төбелердің биіктігі (1-қабат / 2–6 қабаттар)',
  },
  {
    value: '100 мест',
    valueKk: '100 орын',
    label: 'паркинг: 50 подземных · 50 гостевых',
    labelKk: 'автотұрақ: 50 жер асты · 50 қонақтарға арналған',
  },
] as const;

export const OBJECT_SPECS = [
  { label: 'Объект', labelKk: 'Нысан', value: 'БЦ BEREKE', valueKk: 'BEREKE БО' },
  { label: 'Класс', labelKk: 'Класс', value: 'A', valueKk: 'A' },
  {
    label: 'Адрес',
    labelKk: 'Мекенжай',
    value: 'г. Алматы, ул. Щепкина 35/1',
    valueKk: 'Алматы қ., Щепкин көшесі, 35/1',
  },
  {
    label: 'Этажность',
    labelKk: 'Қабаттылығы',
    value: '6 этажей + подземный паркинг',
    valueKk: '6 қабат + жер асты автотұрағы',
  },
  {
    label: 'Общая площадь',
    labelKk: 'Жалпы ауданы',
    value: '14 000 м²',
    valueKk: '14 000 м²',
  },
  {
    label: 'Площадь офисов',
    labelKk: 'Кеңсе ауданы',
    value: 'от 44 до 500 м²',
    valueKk: '44-тен 500 м²-ге дейін',
  },
  {
    label: '1 этаж',
    labelKk: '1-қабат',
    value: '4 помещения · 294 / 379 / 319 / 403 м²',
    valueKk: '4 жай · 294 / 379 / 319 / 403 м²',
  },
  {
    label: 'Тип сделки',
    labelKk: 'Мәміле түрі',
    value: 'Прямая продажа от застройщика',
    valueKk: 'Құрылыс салушыдан тікелей сату',
  },
  {
    label: 'Стоимость офисов за м²',
    labelKk: 'Кеңсенің м² бағасы',
    value: 'от 1 100 000 ₸',
    valueKk: '1 100 000 ₸-ден бастап',
  },
] as const;

/** 1 этаж — коммерция (не офисы), фиксированная цена */
export const FIRST_FLOOR_COMMERCIAL = {
  units: 4,
  pricePerSqm: 2_200_000,
  purpose: 'ресторан, кофейня, шоурум, представительство, банк',
  areasSqm: [294, 379, 319, 403] as const,
  ceilingHeightM: 4.5,
} as const;

/** Калькулятор — прайс БЦ BEREKE (без 1 этажа): ₸/м² по площади и % оплаты */
export const CALCULATOR_PAYMENT_PERCENTS = [100, 70, 50, 30] as const;

export type CalculatorPaymentPercent = (typeof CALCULATOR_PAYMENT_PERCENTS)[number];

export const CALCULATOR_PRICE_TABLE = {
  under200: { 100: 1_200_000, 70: 1_250_000, 50: 1_300_000, 30: 1_350_000 },
  from200to400: { 100: 1_150_000, 70: 1_200_000, 50: 1_250_000, 30: 1_300_000 },
  over400: { 100: 1_100_000, 70: 1_150_000, 50: 1_200_000, 30: 1_250_000 },
} as const;

export function getCalculatorPricePerSqm(
  area: number,
  paymentPercent: CalculatorPaymentPercent = 100,
) {
  const tier =
    area < 200
      ? CALCULATOR_PRICE_TABLE.under200
      : area <= 400
        ? CALCULATOR_PRICE_TABLE.from200to400
        : CALCULATOR_PRICE_TABLE.over400;
  return tier[paymentPercent];
}

export function getCalculatorAreaTierLabel(area: number) {
  if (area < 200) return 'до 200 м²';
  if (area <= 400) return '200–400 м²';
  return 'более 400 м²';
}

export const CALCULATOR = {
  minArea: 44,
  maxArea: 500,
  defaultArea: 60,
  defaultPaymentPercent: 100 as CalculatorPaymentPercent,
  areaMatchDelta: 15,
  maxMatchingLots: 3,
  presets: [44, 84, 170, 250, 400, 500],
} as const;

/** Помещения для подбора в калькуляторе (без 1 этажа) */
export const CALCULATOR_LOTS = [
  {
    id: 'calc-lot-1',
    area: 44.176,
    floor: 3,
    label: 'Open space, 6 рабочих мест',
    labelKk: 'Open space, 6 жұмыс орны',
  },
  {
    id: 'calc-lot-2',
    area: 45,
    floor: 3,
    label: 'Компактный open space',
    labelKk: 'Ықшам open space',
  },
  {
    id: 'calc-lot-3',
    area: 74.787,
    floor: 3,
    label: 'Open space, 4 рабочие зоны',
    labelKk: 'Open space, 4 жұмыс аймағы',
  },
  {
    id: 'calc-lot-4',
    area: 83.848,
    floor: 3,
    label: 'Open space, вид на город',
    labelKk: 'Open space, қалаға көрініс',
  },
  {
    id: 'calc-lot-5',
    area: 83.848,
    floor: 3,
    label: 'Lounge и рабочая зона',
    labelKk: 'Lounge және жұмыс аймағы',
  },
  {
    id: 'calc-lot-6',
    area: 169.416,
    floor: 3,
    label: 'Представительский open space',
    labelKk: 'Беделді open space',
  },
].filter((lot) => lot.floor !== 1);

/** Карточки в ленте «Доступные пространства» */
export const LAYOUTS = [
  {
    id: 'top-office',
    area: 44.176,
    floor: 3,
    title: '44,176 м²',
    type: '3 этаж · Open space, 6 рабочих мест',
    typeKk: '3-қабат · Open space, 6 жұмыс орны',
    image: '/images/layouts/layout-office-top.jpeg',
  },
  {
    id: 'top-3',
    area: 83.848,
    floor: 3,
    title: '83,848 м²',
    type: '3 этаж · Open space, вид на город',
    typeKk: '3-қабат · Open space, қалаға көрініс',
    image: '/images/layouts/layout-top-3.jpeg',
  },
  {
    id: 'top-4',
    area: 169.416,
    floor: 3,
    title: '169,416 м²',
    type: '3 этаж · Представительский open space',
    typeKk: '3-қабат · Беделді open space',
    image: '/images/layouts/layout-top-4.jpeg',
  },
  {
    id: 'top-5',
    area: 74.787,
    floor: 3,
    title: '74,787 м²',
    type: '3 этаж · Open space, 4 рабочие зоны',
    typeKk: '3-қабат · Open space, 4 жұмыс аймағы',
    image: '/images/layouts/layout-top-5.jpeg',
  },
  {
    id: 'top-6',
    area: 83.848,
    floor: 3,
    title: '83,848 м²',
    type: '3 этаж · Lounge и рабочая зона',
    typeKk: '3-қабат · Lounge және жұмыс аймағы',
    image: '/images/layouts/layout-top-6.jpeg',
  },
  {
    id: 'top-7',
    area: 45,
    floor: 3,
    title: '45 м²',
    type: '3 этаж · Компактный open space',
    typeKk: '3-қабат · Ықшам open space',
    image: '/images/layouts/layout-top-7.jpeg',
  },
] as const;

/** Страницы 2–8 из «план береке.pdf» — блок «Типовой этаж» */
export const FLOOR_PLANS = [
  {
    id: 'floor-2',
    title: 'План 1',
    titleKk: '1-жоспар',
    image: '/images/floor-plans/floor-plan-02.jpg',
    pdf: '/documents/plan-pages/plan-page-02.pdf',
  },
  {
    id: 'floor-3',
    title: 'План 2',
    titleKk: '2-жоспар',
    image: '/images/floor-plans/floor-plan-03.jpg',
    pdf: '/documents/plan-pages/plan-page-03.pdf',
  },
  {
    id: 'floor-4',
    title: 'План 3',
    titleKk: '3-жоспар',
    image: '/images/floor-plans/floor-plan-04.jpg',
    pdf: '/documents/plan-pages/plan-page-04.pdf',
  },
  {
    id: 'floor-5',
    title: 'План 4',
    titleKk: '4-жоспар',
    image: '/images/floor-plans/floor-plan-05.jpg',
    pdf: '/documents/plan-pages/plan-page-05.pdf',
  },
  {
    id: 'floor-6',
    title: 'План 5',
    titleKk: '5-жоспар',
    image: '/images/floor-plans/floor-plan-06.jpg',
    pdf: '/documents/plan-pages/plan-page-06.pdf',
  },
  {
    id: 'floor-7',
    title: 'План 6',
    titleKk: '6-жоспар',
    image: '/images/floor-plans/floor-plan-07.jpg',
    pdf: '/documents/plan-pages/plan-page-07.pdf',
  },
  {
    id: 'floor-8',
    title: 'План 7',
    titleKk: '7-жоспар',
    image: '/images/floor-plans/floor-plan-08.jpg',
    pdf: '/documents/plan-pages/plan-page-08.pdf',
  },
] as const;

export const ARCHITECTURE_GALLERY = [
  { id: 'exterior-1', alt: 'БЦ BEREKE — вид снаружи', image: '/images/bereke-exterior-1.jpeg' },
  { id: 'exterior-2', alt: 'БЦ BEREKE — фасад', image: '/images/bereke-exterior-2.jpeg' },
  { id: 'exterior-3', alt: 'БЦ BEREKE — архитектура', image: '/images/bereke-exterior-3.jpeg' },
] as const;

export const RESIDENTS = [
  'Starbucks',
  'Coffee House',
  'City Workout',
  'Globe Partners',
  'Office Power',
] as const;

export const IMAGES = {
  hero: '/images/bereke-hero-video-poster.webp',
  heroPoster: '/images/bereke-hero-video-poster.webp',
  facadeDay: '/images/bereke-facade-day.jpg',
  architecture: '/images/bereke-exterior-1.jpeg',
  floorPlan: '/images/floor-plans/floor-plan-02.jpg',
  floorPlanPdf: '/documents/bereke-floor-plan.pdf',
} as const;

export const VIDEOS = {
  hero: '/videos/bereke-hero.mp4',
  heroMobile: '/videos/bereke-hero-mobile.mp4',
} as const;

export const COPY = {
  heroEyebrow: 'Bereke Development',
  heroLead:
    'Мы создаём коммерческую недвижимость, в которой работает всё — от планировки до инженерии.',
  heroLeadAccent: 'Пространство, где бизнес растёт.',
  heroCtaConsultation: 'Получить консультацию',
  heroCtaBrochure: 'Скачать буклет',
  heroScrollHint: 'Листайте',
  prefaceLead:
    'Мы создаём бизнес-центры, где форма работает на функцию, а каждый квадратный метр на эффективность вашего бизнеса.',
  prefaceBody:
    'Все объекты Bereke Development соответствуют требованиям СНиП Республики Казахстан, проходят расчёт сейсмостойкости и оснащаются современными инженерными системами. Архитектура, инженерия, безопасность: три опоры, на которых стоит каждый наш проект',
  berekeCardBadge: 'Class A business center',
  berekeCardEyebrow: 'Бизнес-центр класса А',
  berekeCardText:
    'Представительский деловой центр на Щепкина 35/1: выразительная архитектура, продуманная инженерия и пространства для бизнеса, которому важен статус.',
  berekeCardCity: 'Алматы',
  berekeCardStreet: 'Щепкина 35/1',
  advantagesSectionLabel: '02 / Преимущества',
  advantagesTitle: 'ЭКОСИСТЕМА КОМФОРТА ДЛЯ ВАШЕГО БИЗНЕСА',
  advantagesLocationEyebrow: 'Локация',
  advantagesLocationTitle: 'Класс А в деловом эпицентре Алматы',
  advantagesLocationText:
    'БЦ BEREKE это бизнес-центр класса А в Бостандыкском районе, на улице Щепкина 35/1. Локация выбрана с учётом главного запроса делового Алматы: всё нужное в двух минутах. Проспект Аль-Фараби, ТРЦ MEGA, Парк Первого Президента, Университет КазГАСА рядом. Удобные транспортные развязки, высокая проходимость, престижный деловой адрес',
  architectureSectionLabel: '03 / Особенности',
  architectureTitle: 'ЭТАЛОН ФОРМЫ',
  architectureP1:
    'Несущая конструкция: монолитный железобетонный каркас с плитным фундаментом, рассчитанным на сейсмическую нагрузку до 9 баллов по шкале MSK-64',
  architectureP2:
    'Фасадные решения: вентилируемый фасад из неокерамогранита Laminam премиального качества, в сочетании с панорамным остеклением от пола до потолка. Алюминиевый профиль витражей европейского производства, с уникальной системой открывания, обеспечивающей естественную вентиляцию без потери теплоизоляции',
  architectureP3:
    'Внутренняя архитектура построена на сочетании натуральных материалов: травертин, дерево, металл, дизайнерское освещение. Каждая зона (ресепшен, лифтовой холл, коридор) спроектирована как часть единого делового стиля, где комфорт сотрудников и впечатление гостя одинаково важны',
  architectureHint: 'Листайте фото и переходите к планировкам',
  architectureCtaConsultation: 'Получить консультацию',
  architectureCtaLayouts: 'Планировки',
  architecturePrevPhoto: 'Предыдущее фото',
  architectureNextPhoto: 'Следующее фото',
  architecturePhotoAria: 'Фото',
  ctaTitle: 'ОСТАВЬТЕ ЗАЯВКУ, ПРИШЛЁМ РАСЧЁТ ПОД ВАШУ ЗАДАЧУ',
  ctaSubtitle:
    'Менеджер свяжется с вами в течение рабочего дня, расскажет о свободных планировках, актуальных ценах и условиях рассрочки от застройщика',
  formConsent: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных',
  formNamePlaceholder: 'Имя',
  formPhonePlaceholder: 'Телефон',
  formSubmit: 'Отправить',
  formCancel: 'Отмена',
  layoutsSectionLabel: '04 / Планировки',
  layoutsTitle: 'ПРОСТРАНСТВА ДЛЯ ЛЮБОГО МАСШТАБА',
  layoutsSubtitle:
    'В планировках — от компактного офиса под ваш бизнес до представительских этажей для крупной компании. Все помещения сдаются в черновой отделке со свободной планировкой: вы обустраиваете пространство под свой формат работы',
  layoutsFirstFloorBadge: 'Важно · 1 этаж',
  layoutsFirstFloorNote:
    'На 1 этаже — 4 коммерческих помещения: 294, 379, 319 и 403 м². У каждого два входа с улицы и вход с ресепшена. Высота потолков 4,5 м, витражные окна от пола до потолка. Подходят для ресторана, кофейни, шоурума, представительства или банка. Цена 2 200 000 ₸/м² — фиксированный прайс, в калькуляторе не меняется. Калькулятор считает офисы со 2 этажа.',
  floorPlanNote: 'Поэтажный план с разметкой офисов — в PDF',
  floorPlanTypicalLabel: 'Типовой этаж',
  floorPlanFullCta: 'Полный план',
  floorPlanTapHint: 'Нажмите для увеличения',
  imageZoomHint: 'Увеличить',
  layoutsCarouselNote: '',
  layoutsCta: 'Смотреть все пространства',
  layoutsSpacesTitle: 'Доступные пространства',
  layoutsBrand: 'БЦ BEREKE',
  layoutsPrevAria: 'Предыдущая планировка',
  layoutsNextAria: 'Следующая планировка',
  layoutsOpenAria: 'Открыть планировку',
  layoutsCloseAria: 'Закрыть',
  floorPlanPrevAria: 'Предыдущий план',
  floorPlanNextAria: 'Следующий план',
  floorPlanOpenAria: 'Открыть план на весь экран',
  floorPlanCloseAria: 'Закрыть',
  floorPlanDialogAria: 'План этажа',
  calcTitle: 'Калькулятор стоимости',
  calcStep1Title: 'Площадь офиса',
  calcStep2Title: 'Подходящие помещения',
  calcStep3Title: 'Ориентировочная стоимость',
  calcStep1Subtitle: 'Офисы со 2 этажа. 1 этаж — 294 / 379 / 319 / 403 м² под ресторан, кофейню, шоурум, банк',
  calcStep2Subtitle: 'Помещения в БЦ BEREKE, близкие к выбранной площади',
  calcStep3Subtitle: 'Цена зависит от площади и процента оплаты',
  calcAreaAria: 'Площадь офиса',
  calcTierUnder200: 'до 200 м²',
  calcTier200to400: '200–400 м²',
  calcTierOver400: 'более 400 м²',
  calcNoLots: 'Для {area} м² нет готовых карточек в каталоге — менеджер подберёт формат индивидуально.',
  calcSelected: 'Выбрано:',
  calcOptional: 'Выбор необязателен — можно перейти к итоговому расчёту',
  calcPaymentTerms: 'Условия оплаты',
  calcGetExact: 'Получить точный расчёт',
  calcSalesDept: 'Отдел продаж:',
  calcBack: 'Назад',
  calcNext: 'Далее',
  calcStepAria: 'Шаг {step} из {total}',
  calcFloor: 'этаж',
  calcMillion: 'млн',
  calcBillion: 'млрд',
  calcWhatsappIntro: 'Здравствуйте! Хочу получить точный расчёт по офису в БЦ BEREKE.',
  calcWhatsappArea: 'Площадь:',
  calcWhatsappPayment: 'Условия оплаты:',
  calcWhatsappEstimate: 'Ориентир:',
  calcWhatsappLot: 'Помещение:',
  calcWhatsappPricePerSqm: 'Цена за м²:',
  developerTitle: 'О BEREKE DEVELOPMENT',
  developerSectionLabel: 'О компании',
  developerPageTitle: 'О Bereke Development',
  developerP1:
    'Bereke Development, казахстанский девелопер коммерческой недвижимости. Мы строим бизнес-центры, в которых хочется работать и которые становятся точкой притяжения для бизнеса. Наш подход: прямая работа с клиентом без посредников, прозрачные условия сделки и контроль качества на каждом этапе строительства',
  developerP2:
    'БЦ BEREKE наш флагманский проект в Бостандыкском районе Алматы. 14 000 квадратных метров, класс А, премиальная архитектура и инженерия мирового уровня',
  residentsTitle: 'Наши резиденты',
  developerCta: 'Узнать больше',
  locationTitle: 'РАСПОЛОЖЕНИЕ',
  locationBrandTitle: 'БЦ BEREKE',
  locationMapAria: 'Карта расположения БЦ BEREKE',
  supportSectionLabel: '05 / Службы поддержки',
  supportTitle: 'ЗАДАЙТЕ ВОПРОС',
  supportSubtitle:
    'Отправьте запрос удобным для вас способом, мы ответим в рабочее время',
  supportCallbackCta: 'Перезвонить мне',
  supportEmailCta: 'Написать на почту',
  supportDirectContacts: 'Прямые контакты',
  callbackSuccess: 'Заявка принята. Мы перезвоним в рабочее время',
  footerTagline: 'Коммерческая недвижимость класса А',
  footerDescription:
    'Bereke Development — девелопер собственных бизнес-центров в Алматы. Прямая продажа от застройщика.',
  footerNavLabel: 'Навигация',
  footerContactsLabel: 'Контакты',
  footerMaterialsLabel: 'Материалы',
  footerAddressBcLabel: 'Адрес БЦ',
  footerSalesLabel: 'Отдел продаж',
  footerBrochureCta: 'Скачать буклет',
  footerContactsCta: 'Контакты',
  footerLocationLine: 'БЦ BEREKE · ул. Щепкина 35/1 · Алматы',
  footerPrivacyLink: 'Согласие на обработку персональных данных',
  footerLegal: '© ТОО «Bereke Development». Все права защищены.',
  berekeSectionLabel: 'Бизнес-центр',
  constructionSectionLabel: '06 / Ход строительства',
  constructionTitle: 'Ход строительства',
  constructionSubtitle:
    'Здесь мы публикуем актуальные материалы с площадки — чтобы вы могли видеть всё в режиме реального времени',
  constructionEmpty:
    'Обновления скоро появятся здесь. Подписывайтесь на наш Instagram, чтобы видеть стройку в реальном времени',
  constructionInstagramCta: 'Смотреть в Instagram',
  constructionViewCta: 'Смотреть →',
  constructionOpenInstagram: 'Открыть Instagram',
  constructionStageLabel: 'Описание этапа',
  constructionWorksLabel: 'Что сделано',
  constructionVideoLabel: 'Видео',
  constructionPhotosLabel: 'Фотографии',
  constructionMediaVideo: 'Видео',
  constructionMediaPhoto: 'Фото',
  constructionMediaVideoSoon: 'Видео будет тут',
  constructionMediaPhotoSoon: 'Фото будет тут',
  projectsSectionLabel: 'Наши проекты',
  projectCta: 'Смотреть объект',
} as const;

/** Казахские тексты. Пустая строка = на сайте покажется русский fallback. */
export const COPY_KK = {
  heroEyebrow: 'Bereke Development',
  heroLead:
    'Біз жоспарлаудан бастап инженерияға дейін әр деталі ойластырылған коммерциялық жылжымайтын мүлік жасаймыз.',
  heroLeadAccent: 'Бизнесіңіз өсетін кеңістік.',
  heroCtaConsultation: 'Кеңес алу',
  heroCtaBrochure: 'Буклетті жүктеп алу',
  heroScrollHint: 'Төмен қарай',
  prefaceLead: '',
  prefaceBody: '',
  berekeCardBadge: 'Class A business center',
  berekeCardEyebrow: 'А класындағы бизнес-орталық',
  berekeCardText:
    'Щепкин көшесі, 35/1 мекенжайындағы беделді іскерлік орталық: айшықты сәулет, ойластырылған инженерия және мәртебесі жоғары бизнеске арналған кеңістік.',
  berekeCardCity: 'Алматы',
  berekeCardStreet: 'Щепкин көшесі, 35/1',
  advantagesSectionLabel: '02 / Артықшылықтар',
  advantagesTitle: 'БИЗНЕСІҢІЗГЕ АРНАЛҒАН ЖАЙЛЫЛЫҚ ЭКОЖҮЙЕСІ',
  advantagesLocationEyebrow: 'Орналасуы',
  advantagesLocationTitle: 'Алматының іскерлік орталығындағы А класс',
  advantagesLocationText:
    'BEREKE БО — бұл Бостандық ауданындағы, Щепкин көшесі, 35/1 мекенжайында орналасқан А класындағы бизнес-орталық. Орналасатын жері іскерлік Алматының басты сұранысын ескере отырып таңдалған: қажеттінің бәрі екі минуттық жерде. Әл-Фараби даңғылы, MEGA СОО, Тұңғыш Президент саябағы, ҚазБСҚА университеті — дәл қасында. Қолайлы көлік жолдары, жоғары өтімділік, беделді іскерлік мекенжай.',
  architectureSectionLabel: '03 / Ерекшеліктер',
  architectureTitle: 'ФОРМА ЭТАЛОНЫ',
  architectureP1:
    'Көтергіш конструкция: монолитті темірбетон қаңқа және MSK-64 шкаласы бойынша 9 балдық сейсмикалық жүктемеге есептелген плиталы іргетас',
  architectureP2:
    'Қасбет шешімдері: премиум сапалы Laminam неокерамогранитінен жасалған желдетпелі қасбет және еденнен төбеге дейінгі панорамалық шынылау. Еуропалық өндірістің алюминий профильді витраждары — жылу оқшаулауды жоғалтпай табиғи желдетуді қамтамасыз ететін бірегей ашылу жүйесімен',
  architectureP3:
    'Ішкі сәулет табиғи материалдар үйлесіміне негізделген: травертин, ағаш, металл, дизайнерлік жарықтандыру. Әр аймақ (ресепшен, лифт холлы, дәліз) қызметкерлер жайлылығы мен қонақ әсері бірдей маңызды болатын біртұтас іскерлік стильдің бөлігі ретінде жобаланған',
  architectureHint: 'Фотоларды парақтап, жоспарларға өтіңіз',
  architectureCtaConsultation: 'Кеңес алу',
  architectureCtaLayouts: 'Жоспарлар',
  architecturePrevPhoto: 'Алдыңғы фото',
  architectureNextPhoto: 'Келесі фото',
  architecturePhotoAria: 'Фото',
  ctaTitle: 'ӨТІНІМ ҚАЛДЫРЫҢЫЗ — ТАПСЫРМАҢЫЗҒА САЙ ЕСЕП ЖІБЕРЕМІЗ',
  ctaSubtitle:
    'Менеджер жұмыс күні ішінде хабарласып, бос жоспарлар, өзекті бағалар және құрылыс салушыдан бөліп төлеу шарттары туралы айтып береді',
  formConsent: 'Түймені басу арқылы сіз жеке деректерді өңдеуге келісесіз',
  formNamePlaceholder: 'Аты-жөні',
  formPhonePlaceholder: 'Телефон',
  formSubmit: 'Жіберу',
  formCancel: 'Болдырмау',
  layoutsSectionLabel: '04 / Жоспарлар',
  layoutsTitle: 'КЕЗ КЕЛГЕН АУҚЫМҒА АРНАЛҒАН КЕҢІСТІКТЕР',
  layoutsSubtitle:
    'Жоспарларда — бизнесіңізге арналған ықшам кеңседен бастап ірі компанияға арналған беделді қабаттарға дейін. Барлық жайлар қарапайым әрлеумен және еркін жоспарлаумен тапсырылады: кеңістікті өз жұмыс форматыңызға сай жабдықтайсыз.',
  layoutsFirstFloorBadge: 'Маңызды · 1-қабат',
  layoutsFirstFloorNote:
    '1-қабатта — 4 коммерциялық жай: 294, 379, 319 және 403 м². Әрқайсысында көшеден екі кіреберіс және ресепшеннен кіру бар. Төбе биіктігі 4,5 м, еденнен төбеге дейінгі витражды терезелер. Мейрамхана, кофейня, шоурум, өкілдік немесе банк үшін қолайлы. Бағасы 2 200 000 ₸/м² — бекітілген прайс, калькуляторда өзгермейді. Калькулятор 2-қабаттан бастап кеңселерді есептейді.',
  floorPlanNote: 'Кеңселердің орналасу схемасы бар қабат жоспары — PDF форматында',
  floorPlanTypicalLabel: 'Типтік қабат',
  floorPlanFullCta: 'Толық жоспар',
  floorPlanTapHint: 'Үлкейту үшін басыңыз',
  imageZoomHint: 'Үлкейту',
  layoutsCarouselNote: '',
  layoutsCta: 'Барлық кеңістіктерді көру',
  layoutsSpacesTitle: 'Қолжетімді кеңістіктер',
  layoutsBrand: 'BEREKE БО',
  layoutsPrevAria: 'Алдыңғы жоспар',
  layoutsNextAria: 'Келесі жоспар',
  layoutsOpenAria: 'Жоспарды ашу',
  layoutsCloseAria: 'Жабу',
  floorPlanPrevAria: 'Алдыңғы жоспар',
  floorPlanNextAria: 'Келесі жоспар',
  floorPlanOpenAria: 'Жоспарды толық экранда ашу',
  floorPlanCloseAria: 'Жабу',
  floorPlanDialogAria: 'Қабат жоспары',
  calcTitle: 'Баға калькуляторы',
  calcStep1Title: 'Кеңсе алаңы',
  calcStep2Title: 'Сәйкес жайлар',
  calcStep3Title: 'Болжамды құны',
  calcStep1Subtitle:
    'Кеңселер 2-қабаттан басталады. 1-қабат — 294 / 379 / 319 / 403 м²: мейрамхана, кофейня, шоурум, банк',
  calcStep2Subtitle: 'BEREKE БО-дағы таңдалған алаңға жақын жайлар',
  calcStep3Subtitle: 'Баға алаң көлемі мен төлем пайызына байланысты',
  calcAreaAria: 'Кеңсе алаңы',
  calcTierUnder200: '200 м²-ге дейін',
  calcTier200to400: '200–400 м²',
  calcTierOver400: '400 м²-ден астам',
  calcNoLots:
    '{area} м² үшін каталогта дайын карточка жоқ — менеджер форматты жеке іріктейді.',
  calcSelected: 'Таңдалды:',
  calcOptional: 'Таңдау міндетті емес — қорытынды есепке өтуге болады',
  calcPaymentTerms: 'Төлем шарттары',
  calcGetExact: 'Нақты есепті алу',
  calcSalesDept: 'Сату бөлімі:',
  calcBack: 'Артқа',
  calcNext: 'Әрі қарай',
  calcStepAria: 'Қадам {step} / {total}',
  calcFloor: 'қабат',
  calcMillion: 'млн',
  calcBillion: 'млрд',
  calcWhatsappIntro: 'Сәлеметсіз бе! BEREKE БО-дағы кеңсе бойынша нақты есеп алғым келеді.',
  calcWhatsappArea: 'Алаңы:',
  calcWhatsappPayment: 'Төлем шарттары:',
  calcWhatsappEstimate: 'Бағдар:',
  calcWhatsappLot: 'Жай:',
  calcWhatsappPricePerSqm: 'м² бағасы:',
  developerTitle: '',
  developerSectionLabel: '',
  developerPageTitle: '',
  developerP1: '',
  developerP2: '',
  residentsTitle: '',
  developerCta: '',
  locationTitle: 'ОРНАЛАСҚАН ЖЕРІ',
  locationBrandTitle: 'BEREKE БО',
  locationMapAria: 'BEREKE БО орналасу картасы',
  supportSectionLabel: '05 / Қолдау қызметтері',
  supportTitle: 'СҰРАҚ ҚОЙЫҢЫЗ',
  supportSubtitle:
    'Сұрауыңызды өзіңізге ыңғайлы тәсілмен жіберіңіз — біз жұмыс уақытында жауап береміз',
  supportCallbackCta: 'Кері қоңырау шалу',
  supportEmailCta: 'Поштаға жазу',
  supportDirectContacts: 'Тікелей байланыс',
  callbackSuccess: 'Өтінім қабылданды. Жұмыс уақытында қайта қоңырау шаламыз',
  footerTagline: 'А класындағы коммерциялық жылжымайтын мүлік',
  footerDescription:
    'Bereke Development — Алматыдағы өз бизнес-орталықтарының девелопері. Құрылыс салушыдан тікелей сату.',
  footerNavLabel: 'Навигация',
  footerContactsLabel: 'Байланыс мәліметтері',
  footerMaterialsLabel: 'Материалдар',
  footerAddressBcLabel: 'БО мекенжайы',
  footerSalesLabel: 'Сату бөлімі',
  footerBrochureCta: 'Буклетті жүктеп алу',
  footerContactsCta: 'Байланыс мәліметтері',
  footerLocationLine: 'BEREKE БО · Щепкин көшесі, 35/1 · Алматы',
  footerPrivacyLink: 'Дербес деректерді өңдеуге келісім беру',
  footerLegal: '© «Bereke Development» ЖШС. Барлық құқықтар қорғалған.',
  berekeSectionLabel: 'Бизнес-орталық',
  constructionSectionLabel: '06 / Құрылыс барысы',
  constructionTitle: 'Құрылыс барысы',
  constructionSubtitle:
    'Мұнда біз құрылыс алаңынан өзекті материалдарды жариялаймыз — осылайша сіз бәрін нақты уақыт режимінде көре аласыз',
  constructionEmpty: '',
  constructionInstagramCta: '',
  constructionViewCta: 'Көру →',
  constructionOpenInstagram: 'Instagram-ды ашу',
  constructionStageLabel: 'Кезең сипаттамасы',
  constructionWorksLabel: 'Не істелді',
  constructionVideoLabel: 'Бейне',
  constructionPhotosLabel: 'Фотосуреттер',
  constructionMediaVideo: 'Бейне',
  constructionMediaPhoto: 'Фото',
  constructionMediaVideoSoon: 'Бейне осында болады',
  constructionMediaPhotoSoon: 'Фото осында болады',
  projectsSectionLabel: '',
  projectCta: 'Нысанды көру',
} as const;

/** Устаревшие KZ title/category карточек стройки → актуальные. */
export const CONSTRUCTION_TITLE_KK_REPLACEMENTS: Record<string, string> = {
  'Каркас 1–2 этаж': '1–2 қабат қаңқасы',
  'Каркас 3–4 этаж': '3–4 қабат қаңқасы',
  'Каркас 5–6 этаж': '5–6 қабат қаңқасы',
};

export const CONSTRUCTION_CATEGORY_KK_REPLACEMENTS: Record<string, string> = {
  'Монолитный каркас': 'Монолитті қаңқа',
  'Инженерные сети': 'Инженерлік желілер',
  'Общественные зоны': 'Қоғамдық аймақтар',
};

/** Устаревшие KZ site-поля → актуальные. */
export const SITE_KK_REPLACEMENTS = {
  mapNoteKk: {
    'Мұстафин және Рыскулбеков көшелерінің бұрышы':
      'Мұстафин және Рысқұлбеков көшелерінің қиылысы',
  },
  addressSalesKk: {
    'Алматы қ., ул. Щепкина 35Б, ТД Qaratau, 1 этаж':
      'Алматы қ., Щепкин көшесі, 35Б, «Qaratau» Сауда үйі, 1-қабат',
  },
} as const;

/** Устаревшие KZ-дефолты → актуальные (чтобы правки подтягивались без ручного сейва). */
export const COPY_KK_REPLACEMENTS: Partial<Record<keyof typeof COPY_KK, Record<string, string>>> = {
  berekeCardEyebrow: {
    'A класс бизнес-орталық': 'А класындағы бизнес-орталық',
  },
  berekeCardText: {
    'Щепкина 35/1 мекенжайындағы өкілдік іскерлік орталық: мәнерлі сәулет, ойластырылған инженерия және мәртебесі маңызды бизнеске арналған кеңістік.':
      'Щепкин көшесі, 35/1 мекенжайындағы беделді іскерлік орталық: айшықты сәулет, ойластырылған инженерия және мәртебесі жоғары бизнеске арналған кеңістік.',
  },
  berekeCardStreet: {
    'Щепкина 35/1': 'Щепкин көшесі, 35/1',
  },
  projectCta: {
    'Нысанды қарау': 'Нысанды көру',
  },
  footerLegal: {
    '© ТОО «Bereke Development». Все права защищены. Согласие на обработку персональных данных':
      '© «Bereke Development» ЖШС. Барлық құқықтар қорғалған.',
  },
  architectureHint: {
    'Фотоларды парақтап, жоспарламаларға өтіңіз': 'Фотоларды парақтап, жоспарларға өтіңіз',
  },
  architectureP1: {
    'Көтергіш конструкция: монолитті темірбетон қаңқа және MSK-64 шкаласы бойынша 9 балға дейінгі сейсмикалық жүктемеге есептелген плиталы іргетас':
      'Көтергіш конструкция: монолитті темірбетон қаңқа және MSK-64 шкаласы бойынша 9 балдық сейсмикалық жүктемеге есептелген плиталы іргетас',
  },
  advantagesLocationTitle: {
    'Алматының іскерлік эпицентріндегі А класс': 'Алматының іскерлік орталығындағы А класс',
  },
  advantagesLocationText: {
    'БЦ BEREKE — Бостандық ауданындағы, Щепкин көшесі, 35/1 мекенжайындағы А класс бизнес-орталық. Орналасуы іскерлік Алматының басты сұранысын ескере отырып таңдалған: қажеттінің бәрі екі минуттық жерде. Әл-Фараби даңғылы, MEGA СОҚ, Тұңғыш Президент саябағы, ҚазБСҚА университеті — жақын. Қолайлы көлік тораптары, жоғары өтімділік, беделді іскерлік мекенжай':
      'BEREKE БО — бұл Бостандық ауданындағы, Щепкин көшесі, 35/1 мекенжайында орналасқан А класындағы бизнес-орталық. Орналасатын жері іскерлік Алматының басты сұранысын ескере отырып таңдалған: қажеттінің бәрі екі минуттық жерде. Әл-Фараби даңғылы, MEGA СОО, Тұңғыш Президент саябағы, ҚазБСҚА университеті — дәл қасында. Қолайлы көлік жолдары, жоғары өтімділік, беделді іскерлік мекенжай.',
  },
  layoutsSubtitle: {
    'Жоспарларда — бизнесіңізге арналған ықшам кеңседен бастап ірі компанияға арналған өкілдік қабаттарға дейін. Барлық жайлар қарапайым әрлеумен және еркін жоспарлаумен тапсырылады: кеңістікті өз жұмыс форматыңызға сай жабдықтайсыз':
      'Жоспарларда — бизнесіңізге арналған ықшам кеңседен бастап ірі компанияға арналған беделді қабаттарға дейін. Барлық жайлар қарапайым әрлеумен және еркін жоспарлаумен тапсырылады: кеңістікті өз жұмыс форматыңызға сай жабдықтайсыз.',
    'Жоспарларда — бизнесіңізге арналған ықшам кеңседен бастап ірі компанияға арналған өкілдік қабаттарға дейін. Барлық жайлар қарапайым әрлеумен және еркін жоспарлаумен тапсырылады: кеңістікті өз жұмыс форматыңызға сай жабдықтайсыз.':
      'Жоспарларда — бизнесіңізге арналған ықшам кеңседен бастап ірі компанияға арналған беделді қабаттарға дейін. Барлық жайлар қарапайым әрлеумен және еркін жоспарлаумен тапсырылады: кеңістікті өз жұмыс форматыңызға сай жабдықтайсыз.',
  },
  supportSectionLabel: {
    '05 / Қолдау қызметі': '05 / Қолдау қызметтері',
  },
  supportCallbackCta: {
    'Маған қайта қоңырау шалу': 'Кері қоңырау шалу',
  },
  locationTitle: {
    ОРНАЛАСУЫ: 'ОРНАЛАСҚАН ЖЕРІ',
  },
  layoutsFirstFloorNote: {
    '1-қабат: 4 жай, бағасы 2 200 000 ₸/м² — бекітілген прайс, калькуляторда өзгермейді. Бұл коммерция (мейрамханалар, кафе, ритейл), кеңселер емес. Калькулятор 2-қабаттан бастап кеңселерді есептейді.':
      '1-қабатта — 4 коммерциялық жай: 294, 379, 319 және 403 м². Әрқайсысында көшеден екі кіреберіс және ресепшеннен кіру бар. Төбе биіктігі 4,5 м, еденнен төбеге дейінгі витражды терезелер. Мейрамхана, кофейня, шоурум, өкілдік немесе банк үшін қолайлы. Бағасы 2 200 000 ₸/м² — бекітілген прайс, калькуляторда өзгермейді. Калькулятор 2-қабаттан бастап кеңселерді есептейді.',
    '1-қабат: 4 жай, бағасы 2 200 000 ₸/м² — бекітілген баға, калькуляторда өзгермейді. Бұл кеңселер емес, коммерциялық нысандар (мейрамханалар, кафе, ритейл). Калькулятор 2-қабаттан бастап кеңселерді есептейді.':
      '1-қабатта — 4 коммерциялық жай: 294, 379, 319 және 403 м². Әрқайсысында көшеден екі кіреберіс және ресепшеннен кіру бар. Төбе биіктігі 4,5 м, еденнен төбеге дейінгі витражды терезелер. Мейрамхана, кофейня, шоурум, өкілдік немесе банк үшін қолайлы. Бағасы 2 200 000 ₸/м² — бекітілген прайс, калькуляторда өзгермейді. Калькулятор 2-қабаттан бастап кеңселерді есептейді.',
  },
  floorPlanNote: {
    'Кеңселер белгіленген қабат жоспары — PDF форматында':
      'Кеңселердің орналасу схемасы бар қабат жоспары — PDF форматында',
  },
  calcTitle: {
    'Құн калькуляторы': 'Баға калькуляторы',
  },
  calcStep1Title: {
    'Кеңсе ауданы': 'Кеңсе алаңы',
  },
  calcStep3Title: {
    'Шамамен құны': 'Болжамды құны',
  },
  calcStep1Subtitle: {
    'Кеңселер 2-қабаттан. 1-қабат — бөлек, мейрамханалар мен ритейл үшін':
      'Кеңселер 2-қабаттан басталады. 1-қабат — 294 / 379 / 319 / 403 м²: мейрамхана, кофейня, шоурум, банк',
    'Кеңселер 2-қабаттан басталады. 1-қабат — бөлек, мейрамханалар мен ритейл үшін':
      'Кеңселер 2-қабаттан басталады. 1-қабат — 294 / 379 / 319 / 403 м²: мейрамхана, кофейня, шоурум, банк',
  },
  calcStep2Subtitle: {
    'BEREKE БО-дағы таңдалған ауданға жақын жайлар':
      'BEREKE БО-дағы таңдалған алаңға жақын жайлар',
  },
  calcStep3Subtitle: {
    'Баға аудан мен төлем пайызына байланысты':
      'Баға алаң көлемі мен төлем пайызына байланысты',
  },
  calcAreaAria: {
    'Кеңсе ауданы': 'Кеңсе алаңы',
  },
  calcGetExact: {
    'Нақты есеп алу': 'Нақты есепті алу',
  },
  calcWhatsappArea: {
    'Ауданы:': 'Алаңы:',
  },
};

export const LAYOUT_TYPE_KK_REPLACEMENTS: Record<string, string> = {
  '3-қабат · Өкілдік open space': '3-қабат · Беделді open space',
};

export const LOT_LABEL_KK_REPLACEMENTS: Record<string, string> = {
  'Өкілдік open space': 'Беделді open space',
};

export const FLOOR_PLAN_TITLE_KK_REPLACEMENTS: Record<string, string> = {
  'Жоспар 1': '1-жоспар',
  'Жоспар 2': '2-жоспар',
  'Жоспар 3': '3-жоспар',
  'Жоспар 4': '4-жоспар',
  'Жоспар 5': '5-жоспар',
  'Жоспар 6': '6-жоспар',
  'Жоспар 7': '7-жоспар',
};

export const ADVANTAGE_KK_REPLACEMENTS = {
  titleKk: {
    '9 баллдық сейсмикалық төзімділік': '9 балдық сейсмикалық төзімділік',
  },
  textKk: {
    'Монолитті темірбетон қаңқа, ҚР ҚНжЕ бойынша есеп':
      'Монолитті темірбетон қаңқа, ҚР ҚНжЕ бойынша есептелген',
    'Laminam неокерамогранитінен желдетілетін қасбет, еденнен төбеге дейінгі панорамалық витраждар және күрделі ашылу жүйесі':
      'Laminam неокерамогранитінен жасалған желдетпелі қасбет, еденнен төбеге дейінгі панорамалық витраждар және күрделі ашылу жүйесі',
    '4 блоктың әрқайсысында өз лифт тобы. Шың сағаттарда кезек жоқ':
      '4 блоктың әрқайсысында өз лифт тобы бар. Қарбалас сағаттарда кезек болмайды',
    'Тәулік бойы күзет, бейнебақылау, кіруді бақылау, өртке қарсы жүйелер. Әр блокта өз күзет бекеті':
      'Тәулік бойы күзет, бейнебақылау, кіруді бақылау, өртке қарсы жүйелер. Әр блокта өз күзет бекеті қарастырылған',
    'Жер асты автотұрақта 50 орын + аумақтағы 50 қонақ орны. Топ-менеджерлерге, қызметкерлерге және клиенттерге арналған автотұрақ':
      'Жер асты автотұрағында 50 орын + аумақта 50 қонақ орны. Топ-менеджерлерге, қызметкерлер мен клиенттеріңізге арналған автотұрақ',
    'Сервис, ғимаратты күту және резиденттерге қолдау — біздің мойнымызда. Кеңсеңізді өзіміз тапсырамыз: сіз бизнеспен айналысасыз, біз — жайлылықпен':
      'Сервис, ғимаратты күтіп ұстау және резиденттерді қолдау — біздің мойнымызда. Кеңсеңізді өзіміз жалға береміз: сіз бизнеспен айналысасыз, ал біз жайлылықты қамтамасыз етеміз',
    'Басқарушы сервистік компания қонақтарды қарсы алып, алғашқы секундтардан іскерлік атмосфера жасайды':
      'Басқарушы сервистік компания қонақтарды қарсы алып, алғашқы секундтардан бастап іскерлік атмосфера қалыптастырады',
  },
} as const;

export const OBJECT_SPEC_KK_REPLACEMENTS = {
  valueKk: {
    '4 үй-жай · 2 200 000 ₸/м²': '4 жай · 294 / 379 / 319 / 403 м²',
    '4 жай · 2 200 000 ₸/м²': '4 жай · 294 / 379 / 319 / 403 м²',
  },
} as const;

export const STAT_KK_REPLACEMENTS = {
  valueKk: {
    '6 қабат + жер асты паркинг': '6 қабат + жер асты автотұрағы',
    '44–500 м²': '44-тен 500 м²-ге дейін',
  },
  labelKk: {
    'төбе биіктігі (1 қабат / 2–6 қабаттар)': 'төбелердің биіктігі (1-қабат / 2–6 қабаттар)',
    'паркинг: 50 жер асты · 50 қонақ': 'автотұрақ: 50 жер асты · 50 қонақтарға арналған',
  },
} as const;
