// src/utils/cookies.ts

export function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// ตัวอย่าง getThemeCookie (ถ้าใช้)
export function getThemeCookie(): string | null {
  const match = document.cookie.match(new RegExp("(^| )theme=([^;]+)"));
  return match ? match[2] : null;
}