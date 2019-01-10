
const Render = (function(){

	"use strict";

	function element(element, template)
	{
		for(let key in element) {
			let value = element[key];
			let re = new RegExp('%' + key + '%', 'gi');
			if (typeof element[key]!=='object') { // aka is scalar
				template = template.replace(re, value);
			}
		}
		return template;
	}

	function collection(data, template, marks)
	{
		marks = marks || {};
		let r = [];
		r.push (template.ini);
		data.forEach(e => {
			// template de elemento default | especial según _render_type
			let t = template.elm;
			if (e['_render_type'] && template['elm_'+e['_render_type']]) {
				t = template['elm_'+e['_render_type']];
			}
			r.push(element(e, t));
		});
		r.push (template.end);
		let content = r.join("");
		return element(marks, content);
	}

	return {
		element: function(elm, template) {
			return element(elm, template);
		},
		collection: function(data, template, marks) {
			return collection(data, template, marks);
		}
	};

})();
