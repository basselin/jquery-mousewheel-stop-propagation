$.mousewheelStopPropagation()
=============================

This jQuery plugin can prevent scrolling of parent element, or stop propagation with mousewheel event listener.

*Compatibilities: Micorsoft Internet Explorer, Google Chrome, Mozilla Firefox, Apple Safari...*

Usage
-----

```javascript
<script src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
<script src="mousewheelStopPropagation.js"></script>
<script>
$(function(){
	$('#my-element-with-overflow-auto').mousewheelStopPropagation();
});
</script>

```

Options
-------

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `wheelstop` | The scroll was prevented. | Function | `null` |

