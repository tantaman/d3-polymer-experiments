/*global define */
define(['d3', 'xhr'], function (d3, xhr) {
	'use strict';

	var POLL_INTERVAL = 5000;

	function getQuestions(cb) {
		xhr.get('http://api.stackexchange.com/2.1/questions', {
			key: 'U4DMV*8nvpm3EOpvf69Rxw((', // public demo key
			site: 'stackoverflow',
			order: 'desc',
			sort: 'creation',
			filter: 'default'
		}, function(err, xhr) {
			if (err) {
				cb(err);
			} else {
				var data = JSON.parse(xhr.response).items.reverse();
				cb(null, data);
			}
		});
	}

	function pollForQuestions() {
		getQuestions(function(err, data) {
			if (!err) {
				var d = d3.select('body').selectAll('so-question').data(data, function(d) {
					return d.question_id
				});
				// d.call(fillQuestions);
				d.enter().insert('so-question', ':first-child').call(fillQuestions);
				d.exit().remove();
			}
			setTimeout(pollForQuestions, POLL_INTERVAL);
		});
	}

	pollForQuestions();

	function fillQuestions(selection) {
		selection.each(function(d, i) {
			this.qtitle = d.title;
			this.score = d.score;
			this.owner = d.owner.display_name;
			this.answered = d.is_answered ? 'answered' : '';
			this.tags = d.tags;
		})
	}
});