import {
  ADVANTAGES,
  ARCHITECTURE_GALLERY,
  CALCULATOR,
  CALCULATOR_LOTS,
  CALCULATOR_PAYMENT_PERCENTS,
  CALCULATOR_PRICE_TABLE,
  CONSTRUCTION_CATEGORY_KK_REPLACEMENTS,
  CONSTRUCTION_TITLE_KK_REPLACEMENTS,
  CONSTRUCTION_UPDATES,
  COPY,
  COPY_KK,
  ADVANTAGE_KK_REPLACEMENTS,
  COPY_KK_REPLACEMENTS,
  SITE_KK_REPLACEMENTS,
  FIRST_FLOOR_COMMERCIAL,
  FLOOR_PLAN_TITLE_KK_REPLACEMENTS,
  FLOOR_PLANS,
  LAYOUT_TYPE_KK_REPLACEMENTS,
  LOT_LABEL_KK_REPLACEMENTS,
  IMAGES,
  LAYOUTS,
  NAV_ITEMS,
  OBJECT_SPECS,
  PROJECTS,
  RESIDENTS,
  SITE,
  OBJECT_SPEC_KK_REPLACEMENTS,
  STAT_KK_REPLACEMENTS,
  STATS,
  VIDEOS,
} from '@/lib/site-data';
import type {
  AdvantageItem,
  CalculatorLot,
  ConstructionUpdateItem,
  FloorPlanItem,
  LayoutItem,
  NavItem,
  ObjectSpecItem,
  SiteContentData,
  SiteCopy,
  StatItem,
} from '@/lib/content-types';

function applyKkReplacement(
  value: string,
  map: Record<string, string> | undefined,
): string {
  if (!map) return value;
  return map[value] ?? value;
}

function buildDefaultCopy(): SiteCopy {
  return { ...COPY };
}

function buildDefaultCopyKk(): SiteCopy {
  return { ...COPY_KK };
}

export function buildDefaultContent(): SiteContentData {
  return {
    site: { ...SITE },
    copy: buildDefaultCopy(),
    copyKk: buildDefaultCopyKk(),
    nav: NAV_ITEMS.map((item, index) => ({
      id: `nav-${index + 1}`,
      label: item.label,
      labelKk: item.labelKk,
      href: item.href,
      visible: true,
      order: index,
    })),
    projects: PROJECTS.map((project, index) => ({
      ...project,
      visible: true,
      order: index,
    })),
    advantages: ADVANTAGES.map((item, index) => ({
      id: `advantage-${index + 1}`,
      title: item.title,
      titleKk: item.titleKk,
      text: item.text,
      textKk: item.textKk,
      icon: item.icon,
      visible: true,
      order: index,
    })),
    stats: STATS.map((item, index) => ({
      id: `stat-${index + 1}`,
      value: item.value,
      valueKk: item.valueKk,
      label: item.label,
      labelKk: item.labelKk,
      visible: true,
      order: index,
    })),
    objectSpecs: OBJECT_SPECS.map((item, index) => ({
      id: `spec-${index + 1}`,
      label: item.label,
      labelKk: item.labelKk,
      value: item.value,
      valueKk: item.valueKk,
      visible: true,
      order: index,
    })),
    layouts: LAYOUTS.map((item, index) => ({
      ...item,
      visible: true,
      order: index,
    })),
    floorPlans: FLOOR_PLANS.map((item, index) => ({
      ...item,
      visible: true,
      order: index,
    })),
    architectureGallery: ARCHITECTURE_GALLERY.map((item, index) => ({
      ...item,
      visible: true,
      order: index,
    })),
    constructionUpdates: CONSTRUCTION_UPDATES.map((item, index) => ({
      id: item.id,
      date: item.date,
      dateKk: item.dateKk,
      title: item.title,
      titleKk: item.titleKk,
      category: item.category,
      categoryKk: item.categoryKk,
      description: item.description,
      descriptionKk: item.descriptionKk,
      works: [...item.works],
      worksKk: [...item.worksKk],
      photos: item.photos ? [...item.photos] : [],
      videos: item.videos ? [...item.videos] : [],
      instagramUrl: item.instagramUrl,
      visible: true,
      order: index,
    })),
    residents: RESIDENTS.map((name, index) => ({
      id: `resident-${index + 1}`,
      name,
      visible: true,
      order: index,
    })),
    calculatorLots: CALCULATOR_LOTS.map((lot, index) => ({
      ...lot,
      visible: true,
      order: index,
    })),
    calculator: {
      minArea: CALCULATOR.minArea,
      maxArea: CALCULATOR.maxArea,
      defaultArea: CALCULATOR.defaultArea,
      defaultPaymentPercent: CALCULATOR.defaultPaymentPercent,
      areaMatchDelta: CALCULATOR.areaMatchDelta,
      maxMatchingLots: CALCULATOR.maxMatchingLots,
      presets: [...CALCULATOR.presets],
      paymentPercents: [...CALCULATOR_PAYMENT_PERCENTS],
      priceTable: {
        under200: { ...CALCULATOR_PRICE_TABLE.under200 },
        from200to400: { ...CALCULATOR_PRICE_TABLE.from200to400 },
        over400: { ...CALCULATOR_PRICE_TABLE.over400 },
      },
      firstFloorCommercial: {
        units: FIRST_FLOOR_COMMERCIAL.units,
        pricePerSqm: FIRST_FLOOR_COMMERCIAL.pricePerSqm,
        purpose: FIRST_FLOOR_COMMERCIAL.purpose,
        areasSqm: [...FIRST_FLOOR_COMMERCIAL.areasSqm],
        ceilingHeightM: FIRST_FLOOR_COMMERCIAL.ceilingHeightM,
      },
    },
    images: { ...IMAGES },
    videos: { ...VIDEOS },
    sections: {
      hero: true,
      bereke: true,
      advantages: true,
      architecture: true,
      layouts: true,
      contacts: true,
      construction: true,
      footer: true,
      developer: true,
      projects: true,
    },
  };
}

/** Подмешивает дефолты — чтобы старый JSON из БД не ломал новые поля (copyKk, labelKk и т.д.). */
export function normalizeSiteContent(raw: unknown): SiteContentData {
  const defaults = buildDefaultContent();
  if (!raw || typeof raw !== 'object') return defaults;

  const data = raw as Partial<SiteContentData>;
  const copy = { ...defaults.copy, ...(data.copy || {}) };
  // Пустые KZ-поля подтягиваем из дефолтов (чтобы новые переводы появлялись без ручного сейва)
  const copyKk = { ...defaults.copyKk };
  if (data.copyKk) {
    (Object.keys(defaults.copyKk) as (keyof SiteCopy)[]).forEach((key) => {
      const stored = data.copyKk?.[key];
      if (typeof stored === 'string' && stored.trim()) {
        copyKk[key] = applyKkReplacement(stored, COPY_KK_REPLACEMENTS[key]);
      }
    });
  }

  const site = {
    ...defaults.site,
    ...(data.site || {}),
    addressBCKk:
      data.site?.addressBCKk?.trim() || defaults.site.addressBCKk,
    addressSalesKk: applyKkReplacement(
      data.site?.addressSalesKk?.trim() || defaults.site.addressSalesKk,
      SITE_KK_REPLACEMENTS.addressSalesKk,
    ),
    mapNoteKk: applyKkReplacement(
      data.site?.mapNoteKk?.trim() || defaults.site.mapNoteKk,
      SITE_KK_REPLACEMENTS.mapNoteKk,
    ),
  };
  // тяжёлый PNG-логотип → лёгкий WebP-марк
  if (site.logoUrl === '/logo-bereke.png' || site.logoUrl === '/logo-bereke.svg') {
    site.logoUrl = defaults.site.logoUrl;
  }

  const navDefaultsByHref = new Map(defaults.nav.map((item) => [item.href, item]));
  const nav: NavItem[] = Array.isArray(data.nav)
    ? data.nav.map((item, index) => {
        const fallback = navDefaultsByHref.get(item.href) || defaults.nav[index];
        let labelKk = (item.labelKk || fallback?.labelKk || '').trim();
        // одноразовая правка устаревшего дефолта
        if (labelKk === 'Жоспарламалар') labelKk = 'Жоспарлар';
        return {
          id: item.id || fallback?.id || `nav-${index + 1}`,
          label: item.label || fallback?.label || '',
          labelKk: labelKk || fallback?.labelKk || '',
          href: item.href || fallback?.href || '#',
          visible: item.visible ?? true,
          order: typeof item.order === 'number' ? item.order : index,
        };
      })
    : defaults.nav;

  return {
    ...defaults,
    ...data,
    site,
    copy,
    copyKk,
    nav,
    projects: data.projects ?? defaults.projects,
    advantages: Array.isArray(data.advantages)
      ? data.advantages.map((item, index) => {
          const fallback = defaults.advantages[index];
          return {
            id: item.id || fallback?.id || `advantage-${index + 1}`,
            title: item.title || fallback?.title || '',
            titleKk: applyKkReplacement(
              item.titleKk?.trim() || fallback?.titleKk || '',
              ADVANTAGE_KK_REPLACEMENTS.titleKk,
            ),
            text: item.text || fallback?.text || '',
            textKk: applyKkReplacement(
              item.textKk?.trim() || fallback?.textKk || '',
              ADVANTAGE_KK_REPLACEMENTS.textKk,
            ),
            icon: item.icon || fallback?.icon || 'building',
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies AdvantageItem;
        })
      : defaults.advantages,
    stats: Array.isArray(data.stats)
      ? data.stats.map((item, index) => {
          const fallback = defaults.stats[index];
          const valueKk = applyKkReplacement(
            item.valueKk || fallback?.valueKk || '',
            STAT_KK_REPLACEMENTS.valueKk,
          );
          const labelKk = applyKkReplacement(
            item.labelKk || fallback?.labelKk || '',
            STAT_KK_REPLACEMENTS.labelKk,
          );
          return {
            id: item.id || fallback?.id || `stat-${index + 1}`,
            value: item.value || fallback?.value || '',
            valueKk,
            label: item.label ?? fallback?.label ?? '',
            labelKk,
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies StatItem;
        })
      : defaults.stats,
    objectSpecs: Array.isArray(data.objectSpecs)
      ? data.objectSpecs.map((item, index) => {
          const fallback = defaults.objectSpecs[index];
          return {
            id: item.id || fallback?.id || `spec-${index + 1}`,
            label: item.label || fallback?.label || '',
            labelKk: item.labelKk?.trim() || fallback?.labelKk || '',
            value: item.value || fallback?.value || '',
            valueKk: applyKkReplacement(
              item.valueKk?.trim() || fallback?.valueKk || '',
              OBJECT_SPEC_KK_REPLACEMENTS.valueKk,
            ),
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies ObjectSpecItem;
        })
      : defaults.objectSpecs,
    layouts: Array.isArray(data.layouts)
      ? data.layouts.map((item, index) => {
          const fallback = defaults.layouts[index];
          return {
            ...fallback,
            ...item,
            typeKk: applyKkReplacement(
              item.typeKk?.trim() || fallback?.typeKk || '',
              LAYOUT_TYPE_KK_REPLACEMENTS,
            ),
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies LayoutItem;
        })
      : defaults.layouts,
    floorPlans: Array.isArray(data.floorPlans)
      ? data.floorPlans.map((item, index) => {
          const fallback = defaults.floorPlans[index];
          return {
            ...fallback,
            ...item,
            titleKk: applyKkReplacement(
              item.titleKk?.trim() || fallback?.titleKk || '',
              FLOOR_PLAN_TITLE_KK_REPLACEMENTS,
            ),
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies FloorPlanItem;
        })
      : defaults.floorPlans,
    architectureGallery: data.architectureGallery ?? defaults.architectureGallery,
    constructionUpdates: Array.isArray(data.constructionUpdates)
      ? data.constructionUpdates.map((item, index) => {
          const fallback =
            defaults.constructionUpdates.find((entry) => entry.id === item.id) ||
            defaults.constructionUpdates[index];
          return {
            ...fallback,
            ...item,
            dateKk: item.dateKk?.trim() || fallback?.dateKk || '',
            titleKk: applyKkReplacement(
              item.titleKk?.trim() || fallback?.titleKk || '',
              CONSTRUCTION_TITLE_KK_REPLACEMENTS,
            ),
            categoryKk: applyKkReplacement(
              item.categoryKk?.trim() || fallback?.categoryKk || '',
              CONSTRUCTION_CATEGORY_KK_REPLACEMENTS,
            ),
            descriptionKk: item.descriptionKk?.trim() || fallback?.descriptionKk || '',
            works: Array.isArray(item.works) ? item.works : fallback?.works || [],
            worksKk:
              Array.isArray(item.worksKk) && item.worksKk.some((line) => line.trim())
                ? item.worksKk
                : fallback?.worksKk || [],
            photos: Array.isArray(item.photos) ? item.photos : fallback?.photos || [],
            videos: Array.isArray(item.videos) ? item.videos : fallback?.videos || [],
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies ConstructionUpdateItem;
        })
      : defaults.constructionUpdates,
    residents: data.residents ?? defaults.residents,
    calculatorLots: Array.isArray(data.calculatorLots)
      ? data.calculatorLots.map((item, index) => {
          const fallback = defaults.calculatorLots[index];
          return {
            ...fallback,
            ...item,
            labelKk: applyKkReplacement(
              item.labelKk?.trim() || fallback?.labelKk || '',
              LOT_LABEL_KK_REPLACEMENTS,
            ),
            visible: item.visible ?? true,
            order: typeof item.order === 'number' ? item.order : index,
          } satisfies CalculatorLot;
        })
      : defaults.calculatorLots,
    calculator: data.calculator
      ? {
          ...defaults.calculator,
          ...data.calculator,
          priceTable: {
            under200: {
              ...defaults.calculator.priceTable.under200,
              ...(data.calculator.priceTable?.under200 || {}),
            },
            from200to400: {
              ...defaults.calculator.priceTable.from200to400,
              ...(data.calculator.priceTable?.from200to400 || {}),
            },
            over400: {
              ...defaults.calculator.priceTable.over400,
              ...(data.calculator.priceTable?.over400 || {}),
            },
          },
          firstFloorCommercial: {
            ...defaults.calculator.firstFloorCommercial,
            ...(data.calculator.firstFloorCommercial || {}),
            areasSqm:
              data.calculator.firstFloorCommercial?.areasSqm?.length
                ? data.calculator.firstFloorCommercial.areasSqm
                : defaults.calculator.firstFloorCommercial.areasSqm,
            ceilingHeightM:
              data.calculator.firstFloorCommercial?.ceilingHeightM ||
              defaults.calculator.firstFloorCommercial.ceilingHeightM,
            purpose:
              data.calculator.firstFloorCommercial?.purpose?.trim() ||
              defaults.calculator.firstFloorCommercial.purpose,
          },
          presets: data.calculator.presets ?? defaults.calculator.presets,
          paymentPercents: data.calculator.paymentPercents ?? defaults.calculator.paymentPercents,
        }
      : defaults.calculator,
    images: (() => {
      const images = { ...defaults.images, ...(data.images || {}) };
      if (images.hero?.endsWith('bereke-hero-video-poster.jpg')) {
        images.hero = defaults.images.hero;
      }
      if (images.heroPoster?.endsWith('bereke-hero-video-poster.jpg')) {
        images.heroPoster = defaults.images.heroPoster;
      }
      return images;
    })(),
    videos: { ...defaults.videos, ...(data.videos || {}) },
    sections: { ...defaults.sections, ...(data.sections || {}) },
  };
}
