let player = { x: 0, y: 0, z: 0 };
let objects = [];

let x_rot_slider = document.getElementById("x_rot");
let y_rot_slider = document.getElementById("y_rot");
let z_rot_slider = document.getElementById("z_rot");

objects.push({ type: "cube", x: 0, y: 0, z: 0, size: 100, rx: 0.000001, ry: 0.0000001, rz: 0, color: "black" });

function Start() {
	console.log("Start");
}

function Update() {
	let x_rot = x_rot_slider.value/3;
	let y_rot = y_rot_slider.value/3;
	let z_rot = z_rot_slider.value/3;
	objects[0].rx += x_rot * deltaTime;
	objects[0].ry += y_rot * deltaTime;
	objects[0].rz += z_rot * deltaTime;
	for (const object of objects) {
		DrawOBJ(object);
	}
}
