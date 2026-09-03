import type {
  AdvantageItem,
  CalculatorLot,
  ConstructionUpdateItem,
  FloorPlanItem,
  LayoutItem,
  NavItem,
  ObjectSpecItem,
  SiteCopy,
  SiteSettings,
  StatItem,
} from '@/lib/content-types';
import type { Locale } from './locale';

/** Для kk подставляет непустые значения из copyKk, иначе русский. */
export function localizedCopy(
  copy: SiteCopy,
  copyKk: SiteCopy | null | undefined,
  locale: Locale,
): SiteCopy {
  if (locale !== 'kk' || !copyKk) return copy;

  const next = { ...copy };
  (Object.keys(copy) as (keyof SiteCopy)[]).forEach((key) => {
    const value = copyKk[key]?.trim();
    if (value) next[key] = value;
  });
  return next;
}

export function localizedNavLabel(item: NavItem, locale: Locale): string {
  if (locale === 'kk') {
    const kk = item.labelKk?.trim();
    if (kk) return kk;
  }
  return item.label;
}

export function localizedStat(item: StatItem, locale: Locale): Pick<StatItem, 'value' | 'label'> {
  if (locale === 'kk') {
    return {
      value: item.valueKk?.trim() || item.value,
      label: item.labelKk?.trim() || item.label,
    };
  }
  return { value: item.value, label: item.label };
}

export function localizedAddressBC(site: SiteSettings, locale: Locale): string {
  if (locale === 'kk') {
    return site.addressBCKk?.trim() || site.addressBC;
  }
  return site.addressBC;
}

export function localizedMapNote(site: SiteSettings, locale: Locale): string {
  if (locale === 'kk') {
    return site.mapNoteKk?.trim() || site.mapNote;
  }
  return site.mapNote;
}

export function localizedAddressSales(site: SiteSettings, locale: Locale): string {
  if (locale === 'kk') {
    return site.addressSalesKk?.trim() || site.addressSales;
  }
  return site.addressSales;
}

export function localizedAdvantage(
  item: AdvantageItem,
  locale: Locale,
): Pick<AdvantageItem, 'title' | 'text'> {
  if (locale === 'kk') {
    return {
      title: item.titleKk?.trim() || item.title,
      text: item.textKk?.trim() || item.text,
    };
  }
  return { title: item.title, text: item.text };
}

export function localizedObjectSpec(
  item: ObjectSpecItem,
  locale: Locale,
): Pick<ObjectSpecItem, 'label' | 'value'> {
  if (locale === 'kk') {
    return {
      label: item.labelKk?.trim() || item.label,
      value: item.valueKk?.trim() || item.value,
    };
  }
  return { label: item.label, value: item.value };
}

export function localizedLayoutType(item: LayoutItem, locale: Locale): string {
  if (locale === 'kk') return item.typeKk?.trim() || item.type;
  return item.type;
}

export function localizedFloorPlanTitle(item: FloorPlanItem, locale: Locale): string {
  if (locale === 'kk') return item.titleKk?.trim() || item.title;
  return item.title;
}

export function localizedLotLabel(item: CalculatorLot, locale: Locale): string {
  if (locale === 'kk') return item.labelKk?.trim() || item.label;
  return item.label;
}

export function localizedConstructionUpdate(
  item: ConstructionUpdateItem,
  locale: Locale,
): Pick<ConstructionUpdateItem, 'title' | 'category' | 'date' | 'description' | 'works'> {
  if (locale === 'kk') {
    const worksKk = item.worksKk?.filter((line) => line.trim()) ?? [];
    return {
      title: item.titleKk?.trim() || item.title,
      category: item.categoryKk?.trim() || item.category,
      date: item.dateKk?.trim() || item.date,
      description: item.descriptionKk?.trim() || item.description,
      works: worksKk.length > 0 ? worksKk : item.works,
    };
  }
  return {
    title: item.title,
    category: item.category,
    date: item.date,
    description: item.description,
    works: item.works,
  };
}

export function fillTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
