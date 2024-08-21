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

function DrawCircle(center, radius, filled=true, width=1) {
	ctx.lineWidth = width;

	ctx.beginPath();
	ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
	if(filled == true) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
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


	let out = [];
	
	for (const point of points) {
		// Rotate
		// X
		let x1 = point.x;
		let y1 = point.y * Math.cos(object.rx) - Math.sin(object.rx) * point.z;
		let z1 = point.y * Math.sin(object.rx) + Math.cos(object.rx) * point.z;
		// Y
		let x2 = x1 * Math.cos(object.ry) + Math.sin(object.ry) * z1;
		let y2 = y1;
		let z2 = -Math.sin(object.ry) * x1 + Math.cos(object.ry) * z1;
		
		// Z
		let x3 = Math.cos(object.rz) * x2 - Math.sin(object.rz) * y2;
		let y3 = Math.sin(object.rz) * x2 + Math.cos(object.rz) * y2;
		let z3 = z2;

		
		// Perspective

		/*
		let x = (point.x * n) / point.z;
		let y = (point.y * n) / point.z;
		*/

		// Ortho
		let out_x = x3 + width/2;
		let out_y = y3 + height/2;

		out.push({x: out_x, y: out_y});
		
		DrawCircle({x: out_x, y: out_y}, 3, true)
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
