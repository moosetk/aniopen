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
									var inst = new mdui.Dialog('#dialog');
									inst.open();
								} else {
									// no update available
									
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
