if ("serviceWorker" in navigator)
{
	navigator.serviceWorker.register("https://raw.githubusercontent.com/RyanL-29/aniopen/0.7.9/sw.js").then(registration => {
		console.log("SW Registered!");
		console.log(registration);
	}).catch(error => {
		console.log("SW Registration Failed!");
		console.log(error);
	})
}
