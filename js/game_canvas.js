/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * game_canvas.js
 */

function GameCanvas(game)
{
	this.super(game);

	this.texture = {
		0: new ImageLoader(this.game.global.uu_image_src),
		1: new ImageLoader(this.game.global.iridium_image_src)
	};
}
GameCanvas.prototype.is_load = function()
{
	return (this.texture[0].is_load && this.texture[0].is_load);
};
GameCanvas.prototype.render = function()
{
	if (!this.is_load())
	this.context.clearRect(0, 0, this.node.width, this.node.height);
	for (var i = 0, u, s = this.game.global.uu_size; i < this.game.uus.length; ++i)
	{
		u = this.game.uus[i];
		this.context.drawImage(this.texture[u.id].image, 0, 0, s, s, u.x, u.y, s, s);
	}
};
fus.extend(GameCanvas, Canvas);
