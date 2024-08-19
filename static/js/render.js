function DrawOBJ(object) {
	if (object.type == "cube") {
		DrawCube(object);
	}
}

function DrawCube(object) {
	let points = [];
	let p = object.size;
	let m = -object.size;
	let n = 0.1;

	points.push({ x: object.x, y: object.y, z: object.z });
	points.push({ x: object.x + p, y: object.y, z: object.z });
	points.push({ x: object.x, y: object.y + p, z: object.z });
	points.push({ x: object.x + p, y: object.y + p, z: object.z });
	points.push({ x: object.x, y: object.y, z: object.z + p });
	points.push({ x: object.x + p, y: object.y, z: object.z + p });
	points.push({ x: object.x, y: object.y + p, z: object.z + p });
	points.push({ x: object.x + p, y: object.y + p, z: object.z + p });

	for (const point of points) {
		let x = (point.x * n) / point.z;
		let y = (point.y * n) / point.z;

		ctx.fillRect(x, y, 10, 10);
		console.log(x, y);
	}
}
