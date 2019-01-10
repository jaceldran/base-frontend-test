/**
 * helper chart
 */
const Chart = (function(){

	"use strict";

	//const container = "display-chart";
	const settings = {
		chart: {
			type: 'areaspline'
		},
		title: {
			text: ''
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 150,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			/*categories: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			],*/
			/*plotBands: [{ // visualize the weekend
				from: 4.5,
				to: 6.5,
				color: 'rgba(68, 170, 213, .2)'
			}]*/
		},
		yAxis: {
			title: {
				text: 'Values'
			}
		},
		/*tooltip: {
			shared: true,
			valueSuffix: ' units'
		},*/
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		},
		/*series: [{
			name: 'John',
			data: [3, 4, 3, 5, 4, 10, 12]
		}, {
			name: 'Jane',
			data: [1, 3, 4, 3, 3, 5, 4]
		}]*/
	};


	function render(container, data)
	{
		if ( (data && data.length===0)  || (!data)) {
			App.notify({
				type: "info",
				message: "NO_DATA",
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
			data: serie1 //[3, 4, 3, 5, 4, 10, 12]
		}, {
			name: 'Value 2',
			data: serie2 //[1, 3, 4, 3, 3, 5, 4]
		}];
		settings.series = series;

		Highcharts.chart(container, settings);


	}

	//render("display-chart", {});

	return {
		render: function(container, data) {
			render(container, data);
		}
	}

})();


