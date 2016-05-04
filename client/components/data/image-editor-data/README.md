ImageEditorData
================

A component to decouple the image editor state management from rendering

## Usage

A child component wrapped with `<ImageEditorData />` will be passed the following props:
* `rotate` - specifies the degrees in which the image should be rotated
* `scaleX` - specifies the scale (in float, i.e. 1 is default) of the X axis, can be used to flip the image by passing a negative number
* `scaleY` - specifies the scale (in float, i.e. 1 is default) of the Y axis, can be used to flip the image by passing a negative number
* `setEditorState` - a function that takes and object of format `{rotate: <x>, scaleX: <y>, scaleY: <z>}`. It will be merged with the current state and passed to the other child components
* `resetEditorState` - a function resetting the editor to its initial state, i.e. rotate=0, scale=0 etc.
