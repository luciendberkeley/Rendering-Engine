let player = { x: 0, y: 0, z: 0 };
let objects = [];

objects.push({ type: "cube", x: 100, y: 0, z: 0, size: 10, color: "black" });

function Start() {
	console.log("Start");
}

function Update() {
	let n = 0.01;

	for (const object of objects) {
		DrawOBJ(object);
	}
}
