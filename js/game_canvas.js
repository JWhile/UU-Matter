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

	var self = this;

	this.event('click', function(e)
	{
		self.click(e.offsetX, e.offsetY);
	}, false);
}
GameCanvas.prototype.click = function(x, y)
{
	for (var i = 0, u, s = this.game.global.uu_size; i < this.game.party.uus.length; ++i)
	{
		u = this.game.party.uus[i];
		if (x > u.x && x < (u.x + s)
			&& y > u.y && y < (u.y + s))
		{
			if (!u.exploded)
			{
				u.click();
				u.removed = true;
			}
			return;
		}
	}
};
GameCanvas.prototype.is_load = function()
{
	return (this.texture[0].is_load && this.texture[0].is_load);
};
GameCanvas.prototype.render = function()
{
	if (!this.is_load())
		return;
	this.clear();
	for (var i = 0, u, s = this.game.global.uu_size; i < this.game.party.uus.length; ++i)
	{
		u = this.game.party.uus[i];
		this.context.drawImage(this.texture[u.id].image, 0, 0, s, s, u.x, u.y, s, s);
	}
};
fus.extend(GameCanvas, Canvas);
