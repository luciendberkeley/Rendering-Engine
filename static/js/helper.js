Start();

const canvas = document.querySelector(".game_canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = 9/10 * window.innerHeight);

let pressed_keys = {};
let last_pressed = {};

document.addEventListener("keydown", (event) => {
	pressed_keys[event.key] = {"pressed": true, "keydown": true, "keyup": false};
});

document.addEventListener("keyup", (event) => {
	pressed_keys[event.key] = {"pressed": false, "keydown": false, "keyup": true};
});

function GetKey(keycode) {
	if(pressed_keys[keycode]) {
		return pressed_keys[keycode].pressed;
	} else {
		return false;
	}
}

function GetKeyDown(keycode) {
	if(pressed_keys[keycode]) {
		return pressed_keys[keycode].keydown;
	} else {
		return false;
	}
}

function GetKeyUp(keycode) {
	if(pressed_keys[keycode]) {
		return pressed_keys[keycode].keyup;
	} else {
		return false;
	}
}

function draw_loop() {
	Clear(true);
	Update();
	requestAnimationFrame(draw_loop);
	
	let keys = Object.keys(pressed_keys);
	// Make sure that keyups and keydowns are cleared
	for(let i=0; i < keys.length; i++) {
		if(pressed_keys[keys[i]].keydown == last_pressed[keys[i]].keydown) {
			pressed_keys[keys[i]].keydown = false;
		}
		if(pressed_keys[keys[i]].keyup == last_pressed[keys[i]].keyup) {
			pressed_keys[keys[i]].keyup = false;
		}
	}
	
	last_pressed = pressed_keys;
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
