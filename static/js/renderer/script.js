let player = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
let objects = [];

let x_rot_slider = document.getElementById("x_rot");
let y_rot_slider = document.getElementById("y_rot");
let z_rot_slider = document.getElementById("z_rot");

let shape_selector = document.getElementById("shape");
let projection_selector = document.getElementById("projection");

let speed = 300;

objects.push({ type: "Cube", x: 0, y: 0, z: 500, size: 100, rx: 0.000001, ry: 0.0000001, rz: 0, color: "black" });

let shape = shape_selector.value;
let projection = projection_selector.value;

let mouseDown = false;

document.addEventListener("mousedown", (event) => {
	mouseDown = true;
});

document.addEventListener("mouseup", (event) => {
	mouseDown = false;
});

document.addEventListener("mousemove", (event) => {
	console.log(`X: ${event.movementX}, Y: ${event.movementY}`);
	if(mouseDown) {
		objects[0].rx -= Math.abs(event.movementY / 300);
		objects[0].ry += Math.abs(event.movementX / 300);
	}
});


function Start() {
	console.log("Start");
}

function Update() {
	if(shape_selector.value != shape) {
		shape = shape_selector.value;
		objects = [];
		objects.push({ type: shape, x: 0, y: 0, z: 500, size: 100, rx: 0.000001, ry: 0.0000001, rz: 0, color: "black" });
	}

	if(GetKey("w")) {
		player.z -= speed * deltaTime;
	}
	if(GetKey("s")) {
		player.z += speed * deltaTime;
	}
	if(GetKey("a")) {
		player.x += speed * deltaTime;
	}
	if(GetKey("d")) {
		player.x -= speed * deltaTime;
	}
	if(GetKey("e")) {
		player.y += speed * deltaTime;
	}
	if(GetKey("q")) {
		player.y -= speed * deltaTime;
	}

	projection = projection_selector.value;

	
	let x_rot = x_rot_slider.value/30;
	let y_rot = y_rot_slider.value/30;
	let z_rot = z_rot_slider.value/30;
	objects[0].rx += x_rot * deltaTime;
	objects[0].ry += y_rot * deltaTime;
	objects[0].rz += z_rot * deltaTime;
	for (const object of objects) {
		DrawOBJ(object, projection);
	}
}
