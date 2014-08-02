/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * loader.js
 */

function ImageLoader(url)
{
	this.is_load = false;
	this.image = new Image();
	this.on_load = null;

	var self = this;

	this.image.addEventListener('load', function()
	{
		self.is_load = true;
		if (self.on_load != null)
			self.on_load(self);
	}, false);
	this.image.src = url;
}

function Sprite(url, size_x, size_y, length)
{
	this.super(url);

	this.size_x = size_x;
	this.size_y = size_y;
	this.length = length;
}
Sprite.prototype.draw = function(context, x, y, index)
{
	context.drawImage(this.image, this.size_x * index, 0, this.size_x, this.size_y, x, y, this.size_x, this.size_y);
};
fus.extend(Sprite, ImageLoader);
