(function(){

	"use strict";

	const Table = {
		display: function(content) {
			const table = document.getElementById("display-table");
			table.innerHTML = content;
		},
		render: function(data) {
			const template = {
				ini: `<table class="striped"><tr>
				<th>Date/time</th>
				<th class="wmin align-center">Value 1</th>
				<th class="wmin align-center">Value 2</th>
				</tr>`,
				elm: `<tr id="row-%id%">
					<td>%timestamp_render%</td>
					<td class="wmin align-center">
						<input class="align-center value1" type="text" step="any" value="%value1%">
					</td>
					<td class="wmin align-center">
						<input class="align-center value2" type="text" step="any" value="%value2%">
					<//td>
				</tr>`,
				end: `</table>`,
			};
			return Render.collection(data, template);
		},
		listen: function() {
			// listener para detectar cambios en inputs de valores de la tabla
			const inputs = document.querySelectorAll("#display-table input");
			inputs.forEach( function(input){
				input.addEventListener("change", function(evt) {
					// para PUT hay que enviar value1 y value2
					const id = this.parentNode.parentNode.id;
					const value1 = document.querySelector(`#${id} .value1`).value;
					const value2 = document.querySelector(`#${id} .value2`).value;
					// validación simple
					// ajustar y validar el valor cambiado actual
					const value = parseFloat(this.value);
					if( `${value}` !== this.value ) {
						alert(`Invalid value (${this.value})`);
						return;
					}
					// API request
					Api.putValue({
						id: id,
						value1: value1,
						value2: value2,
						success: function (response) {
							console.log( `${response.status} ${response.statusText}`);
						}
					});
				});
			});
		},
		refresh: function(data) {
			this.display(this.render(data));
			this.listen();
		}
	}
/*
	function displayTable(content)
	{
		const table = document.getElementById("display-table");
		table.innerHTML = content;
	}

	function renderTable(data)
	{
		const template = {
			ini: `<table class="striped"><tr>
			<th>Date/time</th>
			<th class="wmin align-center">Value 1</th>
			<th class="wmin align-center">Value 2</th>
			</tr>`,
			elm: `<tr id="row-%id%">
				<td>%timestamp_render%</td>
				<td class="wmin align-center">
					<input class="align-center value1" type="text" step="any" value="%value1%">
				</td>
				<td class="wmin align-center">
					<input class="align-center value2" type="text" step="any" value="%value2%">
				<//td>
			</tr>`,
			end: `</table>`,
		};
		return Render.collection(data, template);
	}

	function listenTable()
	{
		// listener para detectar cambios en inputs de valores de la tabla
		const inputs = document.querySelectorAll("#display-table input");
		inputs.forEach( function(input){
			input.addEventListener("change", function(evt) {
				// para PUT hay que enviar value1 y value2
				const id = this.parentNode.parentNode.id;
				const value1 = document.querySelector(`#${id} .value1`).value;
				const value2 = document.querySelector(`#${id} .value2`).value;

				// validación simple
				// ajustar y validar el valor cambiado actual
				const value = parseFloat(this.value);
				if( `${value}` !== this.value ) {
					alert(`Invalid value (${this.value})`);
					return;
				}

				// API request
				Api.putValue({
					id: id,
					value1: value1,
					value2: value2,
					success: function (response) {
						console.log( `${response.status} ${response.statusText}`);
					}
				});
			});
		});
	}
*/

	/**
	 * iniciar listeners y otros
	 */
	function start()
	{
		// listener #select-chart
		document.getElementById("select-chart").addEventListener("change", function(event){
			Api.getLastHours({
				hours: this.value,
				success: function (response) {
					Table.refresh(response);
				},
				fail: function (response) {
					Table.display( response );
				}
			});
		});
	}

	/**
	 * iniciar contexto de aplicación
	 */
	start();
})();


