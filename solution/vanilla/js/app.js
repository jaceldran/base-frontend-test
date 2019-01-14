/**
 * Contexto general de aplicación
 */
const App = (function(){

	"use strict";

	function notify(settings)
	{
		const type = settings.type;
		let message = settings.message;

		switch (type) {
			default:
			message = `<div class="box ${type}">${message}</div>`
		}

		if (settings.target) {
			document.getElementById(settings.target).innerHTML = message;
		} else {
			alert(`${type.toUpperCase()}  ${settings.message}`);
		}

	}

	function refresh(hours, limit)
	{
		Api.getLastHours({
			hours: hours,
			limit: limit,
			success: function (data) {
				Data.render("display-table", data);
				Chart.render("display-chart", data);
			},
			fail: function (message) {
				notify({
					type: "error",
					message: message + '\nPlease check if backend is active and runnig.'
				});
			}
		});
	}

	function start()
	{
		document.getElementById("select-limit").addEventListener("change", function(){
			refresh(this.form.hours.value, this.form.limit.value);
		});

		document.getElementById("select-hours").addEventListener("change", function(){
			refresh(this.form.hours.value, this.form.limit.value);
		});

		const hours = document.getElementById("select-hours").value;
		const limit = document.getElementById("select-limit").value;
		refresh(hours, limit);

		// cargar about
		const url = "README.md";
		fetch(url)
		.then(function(response){
			return response.text();
		}).then(function(text){
			const readme = document.getElementById("display-about");
			readme.innerHTML = `
			<div class="content">${text}</div>
			<button class="close-about" type="button">Close</button>
			`;

			document.querySelector("#display-about .close-about").addEventListener("click", function(){
				document.getElementById("display-about").style.display="none";
				document.body.style.overflow = "auto";
			});

		});

		// show/hide about
		document.querySelector("header .show-about").addEventListener("click", function(){
			document.getElementById("display-about").style.display="grid";
			document.body.style.overflow = "hidden";
		});

	}

	start();

	return {
		notify: function (settings) {
			return notify(settings);
		},
		refresh: function (hours, limit) {
			return refresh(hours, limit);
		}
	}
})();


