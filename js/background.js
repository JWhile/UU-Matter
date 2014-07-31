/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * background.js
 */

var g_rare_blocks = [
	{'id': 4, 'chance': 0.2, 'min': 0, 'max': 13},
	{'id': 3, 'chance': 0.1, 'min': 7, 'max': 14},
	{'id': 2, 'chance': 0.05, 'min': 10, 'max': 15},
	{'id': 5, 'chance': 0.01, 'min': 15, 'max': 17},
	{'id': 6, 'chance': 0.02, 'min': 13, 'max': 16},
];

function Background(game)
{
	this.super();

	this.game = game;
	this.sprite = new Image();
	this.blocks = [];

	this.sprite.src = 'assets/img/background.png';
}
Background.prototype.render = function()
{
	this.context.clearRect(0, 0, this.node.width, this.node.height);
	for (var y = 0, line; y < this.blocks.length; ++y)
	{
		line = this.blocks[y];
		for (var x = 0; x < line.length; ++x)
			this.context.drawImage(this.sprite, line[x] * 32, 0, 32, 32, x * 32, y * 32, 32, 32);
	}
};
Background.prototype.generate = function()
{
	for (var y = 0, line; y < 17; ++y)
	{
		line = [];
		for (var x = 0, rand; x < 17; ++x)
		{
			rand = Math.random();
			for (var i = 0; i < g_rare_blocks.length; ++i)
			{
				if (rand < g_rare_blocks[i]['chance']
					&& y >= g_rare_blocks[i]['min']
					&& y <= g_rare_blocks[i]['max'])
					line[x] = g_rare_blocks[i]['id'];
			}
			if (!line[x])
				line[x] = 1;
		}
		this.blocks[y] = line;
	}
	this.render();
};
fus.extend(Background, Canvas);
