/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * sounds.js
 */

var AudioContext = window.AudioContext || window.webkitAudioContext;

window.AudioContext = AudioContext;

function SoundsManager()
{
	this.context = new AudioContext();
	this.gain_node = this.context.createGain();
	this.sounds = [];

	this.gain_node.connect(this.context.destination);
}
SoundsManager.prototype.get = function(url)
{
	var s = new Sound(this, url);

	this.sounds.push(s);
	return s;
};
SoundsManager.prototype.load = function(url, callback)
{
	var s = this.get(url);

	s.load(callback);
	return s;
};
SoundsManager.prototype.set_volume = function(vol)
{
	this.gain_node.gain.value = vol;
};

function Sound(man, url)
{
	this.manager = man;
	this.url = url;
	this.buffer = null;
}
Sound.prototype.is_load = function()
{
	return (this.buffer !== null);
};
Sound.prototype.load = function(callback)
{
	var req = new XMLHttpRequest();
	var self = this;

	req.open('GET', this.url, true);
	req.responseType = 'arraybuffer';
	req.onload = function()
	{
		self.manager.context.decodeAudioData(req.response, function(buf)
		{
			self.buffer = buf;
			if (typeof callback === 'function')
				callback();
		});
	};
	req.send();
};
Sound.prototype.play = function()
{
	if (this.buffer !== null)
	{
		var source = this.manager.context.createBufferSource();

		source.buffer = this.buffer;
		source.connect(this.manager.gain_node);
		source.start(0);
	}
};
