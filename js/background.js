/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * background.js
 */

function Background(game)
{
	this.super(game);

	this.sprite = new ImageLoader(this.game.global.blocks_sprite_src);
	this.blocks = [];
}
Background.prototype.render = function()
{
	if (!this.sprite.is_load)
		return;
	this.context.clearRect(0, 0, this.node.width, this.node.height);
	for (var y = 0, s = this.game.global.blocks_size,
		nether = this.game.life / this.game.global.max_life * this.blocks.length; y < this.blocks.length; ++y)
	{
		for (var x = 0, rand; x < this.blocks[y].length; ++x)
		{
			rand = Math.random();
			if (this.game.score > -1 && (y + 1 - nether) > rand)
				this.context.drawImage(this.sprite.image, 0, 0, s, s, x * s, y * s, s, s);
			else
				this.context.drawImage(this.sprite.image, this.blocks[y][x] * s, 0, s, s, x * s, y * s, s, s);
		}
	}
};
Background.prototype.generate = function()
{
	for (var y = 0, line, r = this.game.global.rare_blocks,
		size = this.game.global.canvas_size / this.game.global.blocks_size; y < size; ++y)
	{
		line = [];
		for (var x = 0, rand; x < size; ++x)
		{
			rand = Math.random();
			for (var i = 0; i < r.length; ++i)
			{
				if (rand < r[i]['chance'] && y >= r[i]['min'] && y <= r[i]['max'])
					line[x] = r[i]['id'];
			}
			if (!line[x])
				line[x] = 1;
		}
		this.blocks[y] = line;
	}
	this.render();
};
fus.extend(Background, Canvas);
