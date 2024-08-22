let deltaTime = 0;
let last_time = 0;
let this_time = 0;

function frame() {
	this_time = performance.now();
	deltaTime = (Math.abs(this_time - last_time) / 1000).toFixed(6);
	last_time = this_time;
	requestAnimationFrame(frame);
}

frame();
