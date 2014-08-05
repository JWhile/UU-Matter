/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * game.js
 */

function UUMatterGame()
{
	this.g = new Globals();
	this.g.sounds_manager.set_volume(this.g.default_volume);
	this.best_score = localStorage && parseInt(localStorage.getItem(this.g.score_storage_key)) || 0;
	this.sounds_disabled = localStorage && parseInt(localStorage.getItem(this.g.sound_storage_key)) || 0;
	this.party = null;
	this.ui = new UI(this);

	var self = this;

	this.set_sounds_enabled(!this.sounds_disabled);
	this.ui.insert(document.body);
	window.addEventListener('resize', function()
	{
		self.ui.update();
	}, false);
	window.addEventListener('keyup', function(e)
	{
		if (e.keyCode === 27 && self.party !== null && self.party.playing)
		{
			if (self.party.paused)
				self.play();
			else
				self.party.pause();
		}
	}, false);
}
UUMatterGame.prototype.play = function()
{
	if (this.party !== null && this.party.paused)
		this.party.start();
	else
	{
		if (this.party !== null)
			this.ui.background.generate();
		this.party = new Party(this);
		this.party.start();
	}
};
UUMatterGame.prototype.stop = function()
{
	if (this.party !== null)
		this.party.stop();
};
UUMatterGame.prototype.set_sounds_enabled = function(enabled)
{
	this.sounds_disabled = enabled? 0 : 1;
	this.g.sounds_manager.set_enabled(enabled);
	if (localStorage)
		localStorage.setItem(this.g.sound_storage_key, this.sounds_disabled);
};
UUMatterGame.prototype.set_best_score = function(score)
{
	this.best_score = score;
	if (localStorage)
		localStorage.setItem(this.g.score_storage_key, this.best_score);
};
