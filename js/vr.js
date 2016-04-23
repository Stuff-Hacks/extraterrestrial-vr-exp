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
