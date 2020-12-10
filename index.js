if ("serviceWorker" in navigator)
{
	navigator.serviceWorker.register("sw.js").then(registration => {
		registration.onupdatefound = () => {
					const installingWorker = registration.installing;
					installingWorker.onstatechange = () => {
						switch (installingWorker.state) {
							case 'installed':
								if (navigator.serviceWorker.controller) {
									// new update available
									resolve(true);
								} else {
									// no update available
									resolve(false);
								}
								break;
						}
					};
				};
	}).catch(error => {
		//console.log("SW Registration Failed!");
		//console.log(error);
	})
}
