/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * canvas.js
 */

function Canvas()
{
	this.super('canvas');

	this.context = this.node.getContext('2d');
}
fus.extend(Canvas, Builder);
