# Circle-loader animation

Here is a simple plugin for jQuery, which generate an animated svg-circle-loader.

## Sample of usage

To generate an circle-loader you shoud add a container for it. This could be any
block-element, i.e. div:
```
<div id="loader"></div>
```
It's better be empty, as the creating canvas will fill all of it. And here is a
little bit of js:
```js
$(function() {
    $("#loader").circleLoader();
});
```

## Parameters

List of paramters:

 - `stroke` — loader color — any color in valid for html format;
 - `strokeWidth` — loader width: in px or percent. Percentage value will 
calculate uppon the canvas size;
 - `duration` — one cycle animation duration.