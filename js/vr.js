/**
 * Given a filename for a static resource, returns the resource's absolute
 * URL. Supports file paths with or without origin/protocol.
 */
function toAbsoluteURL (url) {
  // Handle absolute URLs (with protocol-relative prefix)
  // Example: //domain.com/file.png
  if (url.search(/^\/\//) != -1) {
    return window.location.protocol + url
  }

  // Handle absolute URLs (with explicit origin)
  // Example: http://domain.com/file.png
  if (url.search(/:\/\//) != -1) {
    return url
  }

  // Handle absolute URLs (without explicit origin)
  // Example: /file.png
  if (url.search(/^\//) != -1) {
    return window.location.origin + url
  }

  // Handle relative URLs
  // Example: file.png
  var base = window.location.href.match(/(.*\/)/)[0]
  return base + url
}
//Bjørn Sandvik: terrain loader alternative------
function loadTerrain(file, callback) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', file, true);
  xhr.onload = function(evt) {    
    if (xhr.response) {
      callback(xhr.response);
    }
  };  
  xhr.send(null);
}

//------------------------------------------------




var width  = window.innerWidth,
height = window.innerHeight;
var scene = new THREE.Scene();
var heights;
scene.add(new THREE.AmbientLight(0xeeeeee));
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    //var terrainLoader = new THREE.TerrainLoader();
    loadTerrain('http://192.168.86.138:5000?data='+toAbsoluteURL("img/molasr_45s315.png"), function(data) {
		
		heights = data;
		//console.log(heights);
		data = _.flatten(data);
		//console.log(data);
        var geometry = new THREE.PlaneGeometry(200, 200, 511, 511);
        //console.log(geometry.vertices.length);
		for (var i = 0, l = geometry.vertices.length; i < l; i++) {
            geometry.vertices[i].z = data[i] / 255.0 * 10;
        }
		var loader = new THREE.TextureLoader();

        var material = new THREE.MeshPhongMaterial({
            map: loader.load('../img/mars45s315.png')
        });
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
    });
    //var controls = new THREE.TrackballControls(camera); 
    document.getElementById('webgl').appendChild(renderer.domElement);

// WASD-style movement controls
var controls = new THREE.FlyControls(camera);

// Disable automatic forward movement
controls.autoForward = false;

// Click and drag to look around with the mouse
controls.dragToLook = true;

// Movement and roll speeds, adjust these and see what happens!
controls.movementSpeed = 20;
controls.rollSpeed = Math.PI / 12;
var clock = new THREE.Clock();


function render() {
        var delta = clock.getDelta();
		controls.update(delta);    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
		//console.log(camera.position.x);
		//console.log(heights);

		//if(heights != null) camera.position.set(camera.position.x, heights[(camera.position.x + 256)][(camera.position.z + 256)], camera.position.z);
    }



render();
/*
 VR.floor();
VR.box();
console.log(VR.body.position);
VR.body.moveX(4);
VR.body.moveZ(4);
VR.body.moveY(4);
VR.box(VR.body.position);
VR.body.moveZ(8);

VR.box({x:2, color:'red', material: 'stone'});

var geometry = new THREE.Geometry();

geometry.vertices.push(
	new THREE.Vector3( 0,  0, -4 ),
	new THREE.Vector3( 4, 0, 0 ),
	new THREE.Vector3(  0, 4, 0 )
);

geometry.faces.push(new THREE.Face3(0,1,2));

var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

var mesh = new THREE.Mesh( geometry, material );
VR.scene.add( mesh );
*/
