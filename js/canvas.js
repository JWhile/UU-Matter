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
	this.context = this.node.getContext('2d');

	this.className('uu-canvas')
		.set('width', game.g.canvas_size)
		.set('height', game.g.canvas_size);
}
Canvas.prototype.clear = function()
{
	this.context.clearRect(0, 0, this.game.g.canvas_size, this.game.g.canvas_size);
};
fus.extend(Canvas, Builder);
