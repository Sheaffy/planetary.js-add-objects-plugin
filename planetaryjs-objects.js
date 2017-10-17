 planetaryjs.plugins.objects = function(config) {
    var objects = [];
    config = config || {};

    var addObject = function(lng, lat, options) {
      options = options || {};
      options.color = options.color || config.color || 'white';
      options.angle = options.angle || config.angle || 5;
      options.ttl   = options.ttl   || config.ttl   || 2000;
      
      options.speed = options.speed || config.speed || 10;

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
        var ping = objects[i];
        var alive = now - ping.time;
        if (alive < ping.options.ttl) {
          newobjects.push(ping);
          drawobject(planet, context, now, alive, ping);
        }
      }
      objects = newobjects;
    };

    var drawobject = function(planet, context, now, alive, ping) {
      
      var coords = planet.projection([(ping.lng), ping.lat])  
      var img = new Image()
      img.src = "/char.png";
      img.append(planet.path)

      var geoangle = d3.geo.distance(
              [ping.lng, ping.lat],
              [
                  -planet.projection.rotate()[0],
                  -planet.projection.rotate()[1]
              ]);

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