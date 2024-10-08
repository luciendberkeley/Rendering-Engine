function DrawOBJ(object, projection) {
	if (object.type == "Cube") {
		DrawCube(object, projection);
	} else if(object.type == "Pyramid") {
		DrawPyramid(object, projection);
	} else if(object.type == "Prism") {
		DrawPrism(object, projection);
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

function RotatePoint(point, object) {
	let rx = object.rx;
	let ry = object.ry;
	let rz = object.rz;
	
	let x1 = point.x;
	let y1 = point.y * Math.cos(rx) - Math.sin(rx) * point.z;
	let z1 = point.y * Math.sin(rx) + Math.cos(rx) * point.z;
	// Y
	let x2 = x1 * Math.cos(ry) + Math.sin(ry) * z1;
	let y2 = y1;
	let z2 = -Math.sin(ry) * x1 + Math.cos(ry) * z1;
	
	// Z
	let x3 = Math.cos(rz) * x2 - Math.sin(rz) * y2;
	let y3 = Math.sin(rz) * x2 + Math.cos(rz) * y2;
	let z3 = z2;

	return { x: x3 + object.x + player.x, y: y3 + object.y + player.y, z: z3 + object.y + player.z };
}

function DrawCube(object, projection) {
	let points = [];
	let p = object.size;
	let m = -object.size;
	let n = 50;

	points.push({ x: m, y: m, z: m});
	points.push({ x: p, y: m, z: m});
	points.push({ x: m, y: p, z: m});
	points.push({ x: p, y: p, z: m});
	points.push({ x: m, y: m, z: p});
	points.push({ x: p, y: m, z: p});
	points.push({ x: m, y: p, z: p});
	points.push({ x: p, y: p, z: p});

	

	let out = [];
	let focalLength = 500;
	
	for (const point of points) {
		let rotated = RotatePoint(point, object);

		if(projection == "Perspective") {
			let scale = focalLength / (rotated.z + focalLength);
			let out_x = rotated.x * scale + width / 2;
			let out_y = rotated.y * scale + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else if(projection == "Orthographic") {
			let out_x = rotated.x + width / 2;
			let out_y = rotated.y + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else {
			console.error(projection)
		}

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

function DrawPrism(object, projection) {
	let points = [];
	let p = object.size;
	let m = -object.size;
	let n = 50;

	points.push({ x: 2*p, y: 0, z: m});
	points.push({ x: 2*m, y: 0, z: m});
	points.push({ x: 2*p, y: 0, z: p});
	points.push({ x: 2*m, y: 0, z: p});
	points.push({ x: 2*m, y: m, z: 0});
	points.push({ x: 2*p, y: m, z: 0});

	

	let out = [];
	let focalLength = 500;
	
	for (const point of points) {
		let rotated = RotatePoint(point, object);

		if(projection == "Perspective") {
			let scale = focalLength / (rotated.z + focalLength);
			let out_x = rotated.x * scale + width / 2;
			let out_y = rotated.y * scale + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else if(projection == "Orthographic") {
			let out_x = rotated.x + width / 2;
			let out_y = rotated.y + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else {
			console.error(projection)
		}

	}

	/*

	Connections:

	0, 1
	1, 3
	0, 2
	3, 4
	4, 1
	4, 5
	3, 2
	2, 5
	5, 0
	
	*/

	DrawLine(out[0], out[1]);
	DrawLine(out[1], out[3]);
	DrawLine(out[0], out[2]);
	DrawLine(out[3], out[4]);
	DrawLine(out[4], out[1]);
	DrawLine(out[4], out[5]);
	DrawLine(out[3], out[2]);
	DrawLine(out[2], out[5]);
	DrawLine(out[5], out[0]);
}


function DrawPyramid(object, projection) {
	let points = [];
	let p = object.size;
	let m = -object.size;
	let n = 50;

	points.push({ x: m, y: m, z: m});
	points.push({ x: p, y: m, z: m});
	points.push({ x: m, y: p, z: m});
	points.push({ x: p, y: p, z: m});
	points.push({ x: 0, y: 0, z: 2*p});

	

	let out = [];
	let focalLength = 500;
	
	for (const point of points) {
		let rotated = RotatePoint(point, object);

		if(projection == "Perspective") {
			let scale = focalLength / (rotated.z + focalLength);
			let out_x = rotated.x * scale + width / 2;
			let out_y = rotated.y * scale + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else if(projection == "Orthographic") {
			let out_x = rotated.x + width / 2;
			let out_y = rotated.y + height / 2;
			
			out.push({x: out_x, y: out_y});
			
			DrawCircle({x: out_x, y: out_y}, 3, true)
		} else {
			console.error(projection)
		}

	}

	/*
	Connections:
	0, 1
	0, 2
	2, 3
	1, 3

	0, 4
	1, 4
	2, 4
	3, 4
	*/

	DrawLine(out[0], out[1]);
	DrawLine(out[0], out[2]);
	DrawLine(out[2], out[3]);
	DrawLine(out[1], out[3]);

	DrawLine(out[0], out[4]);
	DrawLine(out[1], out[4]);
	DrawLine(out[2], out[4]);
	DrawLine(out[3], out[4]);

}