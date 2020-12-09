self.addEventListener("install", e=> {
	e.waitUntil(
	caches.open("static").then(cache => {
		return cache.addAll(["./", "https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/aniopen.png", "https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/telegram.png", "https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/app.js", "https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/favicon.ico"]);
	})
	);
});

self.addEventListener("fetch", e => {
	//console.log(`Intercepting fetch request for: ${e.request.url}`);
	
});

