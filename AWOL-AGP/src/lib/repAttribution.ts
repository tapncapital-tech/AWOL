import { DEFAULT_REP_ID, getRepProfile, RepProfile } from "./repRoster";

const COOKIE_NAME = "awol_rep";
const COOKIE_DAYS = 30;

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function resolveRepFromQuery(search: string): string | null {
  const params = new URLSearchParams(search);
  let repParam = params.get("rep") || params.get("r");
  if (!repParam) {
    for (const [key, value] of params.entries()) {
      if (key.toLowerCase() === "rep" || key.toLowerCase() === "r") {
        repParam = value;
        break;
      }
    }
  }
  return repParam ? repParam.toLowerCase().trim() : null;
}

export function resolveAttributedRep(searchString = ""): RepProfile {
  if (typeof window === "undefined") {
    return getRepProfile(DEFAULT_REP_ID);
  }

  // 1. Check URL query parameters
  const queryRep = resolveRepFromQuery(searchString || window.location.search);
  if (queryRep) {
    const profile = getRepProfile(queryRep);
    setCookie(COOKIE_NAME, profile.rep_id, COOKIE_DAYS);
    try {
      localStorage.setItem(COOKIE_NAME, profile.rep_id);
    } catch {}
    return profile;
  }

  // 2. Fall back to Cookie
  const cookieRep = getCookie(COOKIE_NAME);
  if (cookieRep) {
    return getRepProfile(cookieRep);
  }

  // 3. Fall back to localStorage
  try {
    const stored = localStorage.getItem(COOKIE_NAME);
    if (stored) {
      return getRepProfile(stored);
    }
  } catch {}

  // 4. Default fallthrough
  const defaultProfile = getRepProfile(DEFAULT_REP_ID);
  setCookie(COOKIE_NAME, defaultProfile.rep_id, COOKIE_DAYS);
  try {
    localStorage.setItem(COOKIE_NAME, defaultProfile.rep_id);
  } catch {}
  return defaultProfile;
}
