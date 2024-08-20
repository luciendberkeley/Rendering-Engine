let player = { x: 0, y: 0, z: 0 };
let objects = [];

objects.push({ type: "cube", x: 0, y: 0, z: 0, size: 100, rx: 0.000001, ry: 0.0000001, rz: 0, color: "black" });

function Start() {
	console.log("Start");
}

function Update() {
	objects[0].rx += 0.03;
	objects[0].ry += 0.03;
	for (const object of objects) {
		DrawOBJ(object);
	}
}
