# Experiments with Polymer and D3

Polymer allows us to define custom html elements such as:

```html
<todo-list>
	<todo-item></todo-item>
</todo-list>
```

D3 allows us to create and update the DOM in response to data changes.

Merging the two results in a very powerful way to manage a UI:

```javascript
var todo = d3.select('todo-list').selectAll('todo-item').data(todos, function(d) {
	return d.id;
});
todo.enter().append('todo-item').attr('task', function(d) { return d; });
// where task is a complex object
// e.g.:
// { title: '', done: false, created: date }
// and data-bound by polymer after the attr call.

todo.exit().remove();
```

although data binding accomplishes much the same thing...  is there really a use case for d3 here?
