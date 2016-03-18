# mediacropper
client-side cropping of media (images,video,canvas)

##install

`npm install mediacropper`

or import the js file in the dist folder via `<script>`-tag

## usage
create a new instance of MediaCropper. If you provide a media object, you will be able to draw a selection rectangle in the corresponding dom-element in order to crop out the selection.

```javascript
const mediaCropper = new MediaCropper(document.getElementById('pic'));
```

listen to the `cropped` event to get the cropped part in form of a canvas object

```javascript
mediaCropper.on('cropped', (croppedCanvas)=>{
  document.body.appendChild(croppedCanvas);
});
```

alternatively you can create an instance without providing a source. In this case you can invoke the `cropMedia` method manually. Just provide the media object and an optional options object.

```javascript
const mediaCropper = new MediaCropper();
let croppedCanvas = mediaCropper.cropMedia(document.getElementById('pic'), {
    strech: 0.5, //you can strech the result
    //and the position variables for the area to be cropped out
    left = 0,
    top = 0,
    width = 100,
    height = 100
});
```
