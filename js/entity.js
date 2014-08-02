/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * entity.js
 */

function UUEntity(party)
{
	this.party = party;
	this.id = 0;
	this.x = 0;
	this.y = 0;
	this.aX = (Math.random() * 2 - 1) / 16.6;
	this.aY = (Math.random() * 2 - 1) / 16.6;
	this.last_update = Date.now();
	this.exploded = false;
	this.damage = 1;
	this.removed = false;
}
UUEntity.prototype.click = function()
{
	this.party.set_score(this.party.score + 1);
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
	size -= this.party.game.global.uu_size;
	return (this.x < 0 || this.x > size || this.y < 0 || this.y > size);
};
UUEntity.prototype.setPos = function(x, y)
{
	this.x = x;
	this.y = y;
	return this;
};

function IridiumEntity(party)
{
	this.super(party);

	this.id = 1;
	this.damage = 2;
}
IridiumEntity.prototype.click = function()
{
	this.party.max_life += this.party.game.global.iridium_heal;
	this.party.damage(-this.party.game.global.iridium_heal);
};
fus.extend(IridiumEntity, UUEntity);
