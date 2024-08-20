function DrawOBJ(object) {
	if (object.type == "cube") {
		DrawCube(object);
	}
}

function DrawLine(p1, p2) {
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke(); 
}

function DrawCube(object) {
	let points = [];
	let p = object.size;
	let m = -object.size;
	let n = 50;

	points.push({ x: object.x + m, y: object.y + m, z: object.z + m});
	points.push({ x: object.x + p, y: object.y + m, z: object.z + m});
	points.push({ x: object.x + m, y: object.y + p, z: object.z + m});
	points.push({ x: object.x + p, y: object.y + p, z: object.z + m});
	points.push({ x: object.x + m, y: object.y + m, z: object.z + p});
	points.push({ x: object.x + p, y: object.y + m, z: object.z + p});
	points.push({ x: object.x + m, y: object.y + p, z: object.z + p});
	points.push({ x: object.x + p, y: object.y + p, z: object.z + p});

	console.log(points);

	let out = [];
	
	for (const point of points) {
		// Rotate
		// X
		let x = point.x;
		let y = point.y * Math.cos(object.rx) - Math.sin(object.rx) * point.z;
		let z = point.y * Math.sin(object.rx) + Math.cos(object.rx) * point.z;
		// Y
		x = x * Math.cos(object.ry) + Math.sin(object.ry) * z;
		y = y;
		z = -Math.sin(object.ry) * x + Math.cos(object.ry) * z;
		
		// Z
		x = Math.cos(object.rz) * x + -Math.sin(object.rz) * y;
		y = Math.sin(object.rz) * x + Math.cos(object.rz) * y;
		z = z;

		
		// Perspective

		/*
		let x = (point.x * n) / point.z;
		let y = (point.y * n) / point.z;
		*/

		// Ortho
		let out_x = x + 300;
		let out_y = y + 300;

		out.push({x: out_x, y: out_y});
		
		ctx.fillRect(out_x - 1, out_y - 1, 3, 3);
		console.log(out_x, out_y);
	}

	// Connections:
	/*
	0, 1
	0, 2
	1, 3
	2, 3

	4, 5
	4, 6
	5, 7
	6, 7

	*/

	DrawLine(out[0], out[1]);
	DrawLine(out[0], out[2]);
	DrawLine(out[1], out[3]);
	DrawLine(out[2], out[3]);

	DrawLine(out[4], out[5]);
	DrawLine(out[4], out[6]);
	DrawLine(out[5], out[7]);
	DrawLine(out[6], out[7]);

	DrawLine(out[0], out[4]);
	DrawLine(out[1], out[5]);
	DrawLine(out[2], out[6]);
	DrawLine(out[3], out[7]);
}
