/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * animation.js
 */

function Animation(duration, sprite, x, y)
{
	this.start = Date.now();
	this.duration = duration;
	this.progress = 0;
	this.is_finish = false;
	this.sprite = sprite;
	this.x = x;
	this.y = y;
}
Animation.prototype.render = function(context)
{
	if (!this.sprite.is_load)
		return;
	this.progress = (Date.now() - this.start) / this.duration;
	if (this.progress >= 1)
		this.is_finish = true;
	this.sprite.draw(context, this.x, this.y, Math.round(this.progress * this.sprite.length));
};
