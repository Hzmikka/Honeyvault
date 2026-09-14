import { BakeryLocation, WeekdayKey } from "@/data/locations";
import type { Language } from "@/components/LanguageProvider";

const TIME_ZONE = "America/New_York";

const weekdayMap: Record<string, WeekdayKey> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

function parseTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function formatTime(value: string, language: Language) {
  const [hourString, minuteString] = value.split(":");
  const date = new Date(Date.UTC(2000, 0, 1, Number(hourString), Number(minuteString)));

  return new Intl.DateTimeFormat(language === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: Number(minuteString) === 0 ? undefined : "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
}

function getBusinessClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  return {
    day: weekdayMap[weekday ?? "Mon"],
    minutes: hour * 60 + minute,
  };
}

export type LocationOpenStatus = {
  tone: "open" | "closed" | "neutral";
  label: string;
};

export function getLocationOpenStatus(
  location: BakeryLocation,
  now: Date | null,
  language: Language = "en",
): LocationOpenStatus {
  if (!now) {
    return { tone: "neutral", label: location.scheduleSummary };
  }

  const { day, minutes } = getBusinessClock(now);
  const today = location.hours[day];

  if (!today) {
    return { tone: "closed", label: language === "es" ? "Cerrado hoy" : "Closed today" };
  }

  const opens = parseTime(today.open);
  const closes = parseTime(today.close);

  if (minutes >= opens && minutes < closes) {
    return {
      tone: "open",
      label:
        language === "es"
          ? `Abierto ahora · hasta ${formatTime(today.close, language)}`
          : `Open now · until ${formatTime(today.close, language)}`,
    };
  }

  if (minutes < opens) {
    return {
      tone: "closed",
      label:
        language === "es"
          ? `Abre a las ${formatTime(today.open, language)}`
          : `Opens ${formatTime(today.open, language)}`,
    };
  }

  return {
    tone: "closed",
    label:
      language === "es"
        ? `Cerrado · ${formatTime(today.open, language)}–${formatTime(today.close, language)}`
        : `Closed now · ${formatTime(today.open, language)}–${formatTime(today.close, language)}`,
  };
}
