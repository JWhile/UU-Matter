/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * background.js
 */

function Background(game)
{
	this.super();

	this.game = game;
	this.blocks = [];
}
Background.prototype.render = function()
{
	for(var y = 0, line; y < this.blocks.length; ++y)
	{
		line = this.blocks[1];
		for(var x = 0; x < line.length; ++x)
		{
			//
		}
	}
};
Background.prototype.generate = function()
{
	
	this.render();
};
fus.extend(Background, Canvas);
