/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * entity.js
 */

function UUEntity(game)
{
	this.game = game;
	this.id = 0;
	this.x = 0;
	this.y = 0;
	this.aX = (Math.random() * 2 - 1) / 16.6;
	this.aY = (Math.random() * 2 - 1) / 16.6;
	this.last_update = Date.now();
	this.exploded = false;
	this.removed = false;
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

	var self = this;

	setTimeout(function()
	{
		self.removed = true;
	}, 450);
};
UUEntity.prototype.collide = function(size)
{
	size -= this.game.global.uu_size;
	return (this.x < 0 || this.x > size || this.y < 0 || this.y > size);
};
UUEntity.prototype.setPos = function(x, y)
{
	this.x = x;
	this.y = y;
	return this;
};

function IridiumEntity(game)
{
	this.super(game);

	this.id = 1;
}
IridiumEntity.prototype.click = function()
{
	this.game.damage(-2);
};
fus.extend(IridiumEntity, UUEntity);
