Start();

const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = 9/10 * window.innerHeight);

function draw_loop() {
	Clear(true);
	Update();
	requestAnimationFrame(draw_loop);
}

function Clear(showfps = false, color = "white") {
	let style = ctx.fillStyle;
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = style;

	if (showfps) {
		// Display FPS
		let fps = 1 / deltaTime;

		ctx.font = "50px Arial";
		ctx.fillText(`FPS: ${fps}`, 10, 80);
	}
}

draw_loop();
