 planetaryjs.plugins.objects = function(config) {
    var objects = [];
    config = config || {};

    var addObject = function(lng, lat, options) {
      options = options || {};
      
      options.speed = options.speed || config.speed || 0;
      options.imagesrc = options.imagesrc || config.imagesrc || "";

      var ping = { time: new Date(), options: options };
      if (config.latitudeFirst) {
        ping.lat = lng;
        ping.lng = lat;
      } else {
        ping.lng = lng;
        ping.lat = lat;
      }
      objects.push(ping);
    };

    var drawobjects = function(planet, context, now) {
      var newobjects = [];
      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var timechange = now - object.time;
        newobjects.push(object);
        drawobject(planet, context, now, timechange, object);
        
      }
      objects = newobjects;
    };

    var drawobject = function(planet, context, now, timechange, object) {
      
      var newlng = 0
      if(object.options.speed > 0){
        var xmove = (timechange*(object.options.speed))/100;
        newlng = (object.lng+xmove)
      } else {
        newlng = object.lng
      }
      

      var coords = planet.projection([newlng, object.lat])  
      var img = new Image()
      img.src = object.options.imagesrc;
      

      var geoangle = d3.geo.distance([newlng, object.lat],[-planet.projection.rotate()[0], -planet.projection.rotate()[1]]);

      if (geoangle > 1.57079632679490)
      {
          //Behind Sphere > 90 degrees
      } else {
         context.drawImage(img, coords[0] ,coords[1], 50 ,50)
      }
              

    

    };

    return function (planet) {
      planet.plugins.objects = {
        add: addObject,
        objectList: objects
      };

      planet.onDraw(function() {
           planet.plugins.objects = {
            add: addObject,
            objectList: objects
          };

        var now = new Date();
        planet.withSavedContext(function(context) {
          drawobjects(planet, context, now);
        });
      });
    };
  };