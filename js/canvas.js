/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * canvas.js
 */

function Canvas(game)
{
	this.super('canvas');

	this.game = game;
	this.width = 0;
	this.height = 0;
	this.context = this.node.getContext('2d');

	this.className('uu-canvas');
}
Canvas.prototype.set_size = function(w, h)
{
	this.width = w;
	this.height = h;
	this.set('width', w)
		.set('height', h);
};
Canvas.prototype.clear = function()
{
	this.context.clearRect(0, 0, this.game.g.canvas_size, this.game.g.canvas_size);
};
fus.extend(Canvas, Builder);
