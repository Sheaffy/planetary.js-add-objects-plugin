# planetary.js-add-objects-plugin
Add Objects/Images to the planet that will move with the sphere projection, it also calculates and displays only front facing images for the sphere projection.

Created as a plugin for https://github.com/BinaryMuse/planetary.js

To use this first import the file on your html after the main planetary.js file import.
```
<script type="text/javascript" src="/js/planetaryjs.js"></script>
<script type="text/javascript" src="/js/planetaryjs-objects.js"></script>
```

Once imported you can then load the plugin into the main planet object.
```
planet.loadPlugin(planetaryjs.plugins.objects());		
```

here is an example of it being used to add a object

```   
planet.plugins.objects.add(-1.3167103, 50.6927176, { imagesrc:"/wizard.png" });
```

Plugin Options
```   
{ 
speed: 2,
imagesrc:"/wizard.png",
imageheight:100,
imagewidth:100,
fade:true
}
```   
