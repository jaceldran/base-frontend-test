/**
 * helper data
 */
const Data = (function(){

	"use strict";

	function render(container, data)
	{
		const target = document.getElementById(container);
		if ( (data && data.length===0)  || (!data)) {
			target.innerHTML = '';
			return;
		}
		const template = {
			ini: `<table class="striped"><tr>
			<th class="align-right">#</th>
			<th>Date/time</th>
			<th class="wmin align-center">Value 1</th>
			<th class="wmin align-center">Value 2</th>
			</tr>`,
			elm: `<tr id="row-%_pos%" data-id="%id%">
				<td class="wmin align-right">%_pos%#</td>
				<td>%timestamp_render%</td>
				<td class="wmin align-center">
					<input class="align-center value value1" type="text" step="any" value="%value1%">
				</td>
				<td class="wmin align-center">
					<input class="align-center value value2" type="text" step="any" value="%value2%">
				</td>
			</tr>`,
			end: `</table>`,
		};
		target.innerHTML = Render.collection(data, template);
		listen();
	}

	function listen()
	{
		// listener para detectar cambios en inputs de valores de la tabla
		const inputs = document.querySelectorAll("#display-table input.value");
		inputs.forEach( function(input){
			input.addEventListener("change", function(evt) {
				// para PUT hay que enviar el id y value1 y value2
				const unid = this.parentNode.parentNode.getAttribute("data-id");
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
					id: unid,
					value1: value1,
					value2: value2,
					success: function (response) {
						//console.log( `${response.status} ${response.statusText}`);
						const hours = document.getElementById("select-hours").value;
						const limit = document.getElementById("select-limit").value;
						App.refresh(hours, limit);
					}
				});
			});
		});
	}

	return {
		render: function(container, data) {
			render(container, data);
		}
	}
})();


