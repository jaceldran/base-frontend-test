/**
 * helper chart
 */
const Chart = (function(){

	"use strict";

	const settings = {
		chart: {
			type: 'areaspline'
		},
		title: {
			text: ''
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
			floating: false,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
		},
		yAxis: {
			title: {
				text: 'Values'
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		}
	};

	function render(container, data)
	{
		if ( (data && data.length===0)  || (!data)) {
			App.notify({
				type: "info",
				message: "NO_DATA. Please, check if backend is running.",
				target: "display-chart"
			});
			return;
		}

		let serie1 = [];
		let serie2 = []
		let categories = [];

		data.forEach( (e) => {
			e.category = moment(e.timestamp).format('HH:mm');
			serie1.push(parseFloat(e.value1));
			serie2.push(parseFloat(e.value2));
			categories.push(e.category);
		});
		settings.xAxis.categories = categories;

		const series = [{
			name: 'Value 1',
			data: serie1
		}, {
			name: 'Value 2',
			data: serie2
		}];
		settings.series = series;

		Highcharts.chart(container, settings);
	}

	return {
		render: function(container, data) {
			render(container, data);
		}
	}
})();


