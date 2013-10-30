define(['lodash'], function(_) {
	function objectValues(obj) {
		var result = [];
		for (var k in obj) {
			result.push(obj[k]);
		}

		return result;
	}

	function join(sep) {
		return function(arr) {
			return arr.join(sep);
		}
	}

	function appendQueryParams(url, params) {
		return url + '?' + _.map(_.zip(Object.keys(params), objectValues(params)), join('=')).join('&');
	}

	return {
		get: function(url, params, cb) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', appendQueryParams(url, params));

			xhr.onload = function(e) {
				if (xhr.status != 200)
					cb(e, xhr, null);
				else
					cb(null, xhr, e);
			};

			xhr.onerror = function(e) {
				cb(e, null);
			};

			xhr.send();
		}
	};
});