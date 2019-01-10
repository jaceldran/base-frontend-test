
const Api = (function(){

	"use strict";

	const BASE_URL = "http://localhost:8080/reading";

	function fixUtc(momentObject)
	{
		const s = momentObject.utc().format();
		return s.substr(0, s.length - 1);
	}

	function putValue(settings)
	{
		const params = {
			id: "08125d59-e5d7-4d56-9185-cf78960e071d",
			//id: settings.id,
			value1: settings.value1,
			value2: settings.value2
		}

		const request = {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(params)
		};

		fetch(BASE_URL, request)
		.then( (response) => {
			console.log (response.status);
			if (response.status===200) {
				if (settings.success) {
					settings.success(response);
				}
			} else {
				if (settings.fail) {
					settings.fail(response);
				} else {
					alert(response.statusText);
				}
			}
		})
		.catch( (error) => {
			if (settings.fail) {
				settings.fail(error);
			}
		});
	}

	function getLastHours(settings)
	{
		const start = fixUtc(moment().subtract(settings.hours, 'hours'));
		const end = fixUtc(moment());
		const limit = 100;
		const url = `${BASE_URL}?start=${start}&end=${end}&limit=${limit}`;


		fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			json.forEach( (e) => {
				e.value1 = e.value1.toFixed(2);
				e.value2 = e.value2.toFixed(2);
				e.timestamp_render = moment(e.timestamp).format('DD/MM/YYYY. HH:mm');
			});
			if (settings.success) {
				settings.success(json);
			}
		})
		.catch( (error) => {
			if (settings.fail) {
				settings.fail(error);
			} else {
				alert(`ERROR ${error}`);
				console.log("ERROR", error);
			}
		});
	}

	return {
		getLastHours: function(settings) {
			return getLastHours(settings);
		},
		putValue: function(settings) {
			return putValue(settings);
		}
	};
})();
