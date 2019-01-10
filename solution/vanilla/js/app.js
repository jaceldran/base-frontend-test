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
					message: message
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
	}

	start();

	return {
		notify: function (settings) {
			return notify(settings);
		}
	}
})();


