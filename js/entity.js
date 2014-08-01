/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * entity.js
 */

function UUEntity(game)
{
	this.super('span');

	this.game = game;
	this.x = 0;
	this.y = 0;
	this.aX = (Math.random() * 2 - 1) / 16.6;
	this.aY = (Math.random() * 2 - 1) / 16.6;
	this.last_update = Date.now();
	this.exploded = false;
	this.removed = false;

	var self = this;

	this.className('uu')
		.event('mouseup', function()
		{
			if (!this.exploded)
			{
				self.click();
				self.removed = true;
				self.remove();
			}
		});
}
UUEntity.prototype.click = function()
{
	this.game.set_score(this.game.score + 1);
};
UUEntity.prototype.update = function()
{
	var now = Date.now();
	var diff = now - this.last_update;

	this.setPos(this.aX * diff + this.x, this.aY * diff + this.y);
	this.last_update = now;
};
UUEntity.prototype.explode = function()
{
	this.exploded = true;
	this.css('backgroundColor', 'rgba(255,10,10,0.7)')
		.css('backgroundImage', 'none');

	var self = this;

	setTimeout(function()
	{
		self.removed = true;
		self.remove();
	}, 450);
};
UUEntity.prototype.collide = function(size)
{
	size -= 32;
	return (this.x < 0 || this.x > size || this.y < 0 || this.y > size);
};
UUEntity.prototype.setPos = function(x, y)
{
	this.x = x;
	this.y = y;
	this.css('top', this.x +'px')
		.css('left', this.y +'px');
	return this;
};
fus.extend(UUEntity, Builder);

function IridiumEntity(game)
{
	this.super(game);

	this.css('backgroundImage', game.global.iridium_background_style);
}
IridiumEntity.prototype.click = function()
{
	this.game.damage(-2);
};
fus.extend(IridiumEntity, UUEntity);
