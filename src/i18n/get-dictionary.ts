import type { Dictionary } from "@/types/i18n";
import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ha } from "@/i18n/dictionaries/ha";
import { ar } from "@/i18n/dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ha,
  ar,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
