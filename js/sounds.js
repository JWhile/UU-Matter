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
SoundsManager.prototype.set_volume = function(vol)
{
	this.gain_node.gain.value = vol;
};

function Sound(man, url)
{
	this.manager = man;
	this.url = url;
	this.source = null;
	this.is_load = false;
}
Sound.prototype.load = function(callback)
{
	var req = new XMLHttpRequest();
	var self = this;

	this.source = this.manager.context.createBufferSource();
	this.source.connect(this.manager.gain_node);
	req.open(this.url, 'GET', true);
	req.responseType = 'arraybuffer';
	req.onload = function()
	{
		self.manager.context.decodeAudioData(req.response, function(buf)
		{
			self.source.buffer = buf;
			self.is_load = true;
			callback();
		});
	};
	req.send();
};
Sound.prototype.play = function()
{
	if (this.is_load)
		this.source.start(0);
};
