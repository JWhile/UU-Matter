/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * ui.js
 */

function UI(game)
{
	this.super('div');

	this.game = game;
	this.zoom = 1;

	this.layout = new Builder('div')
		.className('layout');
	this.background = new Background(game)
		.insert(this);
	this.menu_ui = new MenuUI(game)
		.insert(this.layout);
	this.game_ui = new GameUI(game)
		.insert(this.layout);

	this.className('uu-matter');
	this.menu_ui.update();
	this.layout.insert(this);
	this.update();
}
UI.prototype.update = function()
{
	var w = window.innerWidth;
	var h = window.innerHeight;
	var z = 1;

	z = w / this.game.g.canvas_size;
	if (h / this.game.g.canvas_size < z)
		z = h / this.game.g.canvas_size;
	w /= z;
	h /= z;
	this.layout.css('left', (w - this.game.g.canvas_size) / 2 +'px');
	this.layout.css('top', (h - this.game.g.canvas_size) / 2 +'px');
	this.set_zoom(z);
	this.background.set_size(w, h);
	this.background.generate();
};
UI.prototype.set_zoom = function(zoom)
{
	this.zoom = zoom;
	this.css('zoom', zoom);
};
fus.extend(UI, Builder);

function MenuUI(game)
{
	this.super('div');

	this.game = game;
	this.blink_timeout = 0;
	this.best_score = new Builder('p')
		.className('uu-best');
	this.play_button = new Builder('a')
		.className('button')
		.event('click', function()
		{
			game.g.click_sound.play();
			game.play();
		});
	this.stop_button = new Builder('a')
		.className('button')
		.text(this.game.g.stop_button_text)
		.event('click', function()
		{
			game.g.click_sound.play();
			game.stop();
		});

	this.className('uu-menu')
		.append(new Builder('h1')
			.text('UU-Matter'))
		.append(this.best_score)
		.append(this.play_button)
		.append(this.stop_button)
		.append(new Builder('p')
			.className('uu-footer')
			.html(game.g.footer_text));
}
MenuUI.prototype.show = function()
{
	this.css('display', 'block');
};
MenuUI.prototype.hide = function()
{
	this.css('display', 'none');
};
MenuUI.prototype.update = function()
{
	if (this.game.party != null && this.game.party.score >= this.game.best_score)
		this.best_score.text('New best score: '+ this.game.party.score);
	else if (this.game.party != null && this.game.party.score > -1)
		this.best_score.text('Score: '+ this.game.party.score +' (Best: '+ this.game.best_score +')');
	else
		this.best_score.text('Best score: '+ this.game.best_score);
	if (this.game.party != null && this.game.party.paused)
	{
		this.play_button.text(this.game.g.pause_button_text);
		this.stop_button.css('display', 'block');

		var self = this;
		var state = true;

		clearTimeout(this.blink_timeout);
		this.blink_timeout = setInterval(function()
		{
			if (state)
				self.best_score.css('opacity', '0');
			else
				self.best_score.css('opacity', '1');
			state = !state;
		}, this.game.g.score_blink_interval);
	}
	else
	{
		this.play_button.text(this.game.g.play_button_text);
		this.stop_button.css('display', 'none');
		this.best_score.css('opacity', '1');
		clearTimeout(this.blink_timeout);
	}
};
fus.extend(MenuUI, Builder);

function GameUI(game)
{
	this.super('div');

	var self = this;

	this.game = game;
	this.fabricator_timeout = 0;
	this.fibre_cable = new Builder('div')
		.className('fibre-cable')
		.insert(this);
	this.game_canvas = new GameCanvas(game)
		.insert(this);
	this.uu_fabricator = new Builder('div')
		.className('uu-fabricator')
		.insert(this);
	this.score_span = new Builder('span')
		.className('uu-counter')
		.insert(this);
	this.menu = new Builder('div')
		.className('uu-context-menu')
		.insert(this);
	this.pause_button = new Builder('a')
		.className('uu-context-menu-button pause')
		.event('click', function()
		{
			self.game.party.pause();
		})
		.insert(this.menu);
	this.sound_button = new Builder('a')
		.className('uu-context-menu-button sound')
		.event('click', function()
		{
			self.game.set_sounds_enabled(self.game.sounds_disabled);
			self.update();
		})
		.insert(this.menu);

	this.className('uu-game');
}
GameUI.prototype.run_fabricator = function()
{
	var self = this;

	this.uu_fabricator.attr('data-on', '1');
	this.fibre_cable.attr('data-on', '1');
	clearTimeout(this.fabricator_timeout);
	this.fabricator_timeout = setTimeout(function()
	{
		self.uu_fabricator.attr('data-on', '0');
		self.fibre_cable.attr('data-on', '0');
	}, 350);
	this.game.g.bzzz_sound.play();
};
GameUI.prototype.render = function()
{
	this.game_canvas.render();
};
GameUI.prototype.update = function()
{
	if (!this.game.party.playing || this.game.party.paused)
	{
		this.score_span.css('display', 'none');
		this.menu.css('display', 'none');
	}
	else
	{
		this.score_span.css('display', 'block');
		this.score_span.text('x '+ this.game.party.score);
		this.menu.css('display', 'block');
		this.sound_button.attr('sounds-enabled', (this.game.sounds_disabled? 'off' : 'on'));
	}
};
fus.extend(GameUI, Builder);
