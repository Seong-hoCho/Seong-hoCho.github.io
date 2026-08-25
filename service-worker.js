// 오늘의 계기판 — 최소 서비스워커
// 목적: 앱 설치(installability)를 위한 최소 요건 충족 + 오프라인일 때만 캐시로 대체.
// 온라인이면 항상 네트워크 최신본을 우선한다 (캐시 때문에 갱신이 늦게 보이는 문제를 피하기 위함).

const CACHE_NAME = "daily-dashboard-shell-v1";
const SHELL_URL = "./daily-dashboard.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(SHELL_URL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // 대시보드 본문만 네트워크 우선 + 오프라인 시 캐시로 대체.
  if (req.url.includes("daily-dashboard.html")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(SHELL_URL, copy));
          return res;
        })
        .catch(() => caches.match(SHELL_URL))
    );
  }
  // 나머지 요청(구글 폰트, API 호출 등)은 손대지 않고 그대로 통과시킨다.
});
