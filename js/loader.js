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
