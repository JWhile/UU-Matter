/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * uu-matter.js
 */

// class UUMatter extends Builder
function UUMatter()
{
    this.super('div');

    this.uus = []; // :Array<UU>

    this.bestScore = localStorage && parseInt(localStorage.getItem('UUMatterBestScore')) || 0; // :int

    this.life = 0; // :int
    this.score = 0; // :int

    this.toSpawn = 0; // :int

    this.playing = false; // :boolean

    this.fps = new FPS(); // :FPS

    var self = this;

    this.menuBestScore = new Builder('p')
            .text('Best score: '+ this.bestScore)
            .className('uu-best');

    this.menu = new Builder('div')
            .className('uu-menu')
            .append(new Builder('h1')
                .text('UU-Matter'))
            .append(this.menuBestScore)
            .append(new Builder('a')
                .className('button')
                .text('Jouer')
                .event('click', function()
                {
                    self.start();
                }))
            .append(new Builder('p')
                .className('uu-footer')
                .html('Créé par <a href="https://github.com/JWhile" target="_blank">juloo</a> - v0.2.5'));

    this.scoreSpan = new Builder('span')
            .className('uu-counter');

    this.fpsSpan = new Builder('span')
            .css('display', 'none')
            .text('0 fps')
            .className('uu-fps');

    this.uuFabricator = new Builder('div')
            .className('uu-fabricator');

    this.className('uu-matter')
        .append(this.menu)
        .append(this.scoreSpan)
        .append(this.fpsSpan)
        .append(this.uuFabricator);

    this.setScore(0);
}
// function start():void
UUMatter.prototype.start = function()
{
    this.menu.css('display', 'none');

    for(var i = 0; i < this.uus.length; ++i)
    {
        this.uus[i].remove();
    }

    this.uus = [];

    this.setScore(0);

    this.life = 20;
    this.damage(0);

    this.toSpawn = 1;

    this.playing = true;

    var self = this;

    var frames = 0;
    var lastSecond = Date.now();

    var loop = function()
    {
        if(self.playing)
        {
            newFrame(loop);

            self.fps.next();

            var now = Date.now();

            if(self.toSpawn >= 1 && ++frames > (60 / self.toSpawn))
            {
                --self.toSpawn;
                frames = 0;

                self.spawnUU();
            }

            if(now - lastSecond >= 1000)
            {
                lastSecond = now;

                self.fpsSpan.text(self.fps.getFps() +' fps');
            }

            self.update();
        }
    };

    newFrame(loop);

    this.spawnUU();

    this.fpsSpan.css('display', 'block');
};
// function stop():void
UUMatter.prototype.stop = function()
{
    this.playing = false;

    this.menuBestScore.css('color', '#911');

    if(this.score > this.bestScore)
    {
        this.setBestScore(this.score);

        this.menuBestScore.text('Best score: '+ this.bestScore);
    }
    else
    {
        this.menuBestScore.text('Score: '+ this.score +((this.bestScore > 0)? ' (Best: '+ this.bestScore +')' : ''));
    }

    this.menu.css('display', 'block');
    this.fpsSpan.css('display', 'none');
};
// function update():void
UUMatter.prototype.update = function()
{
    for(var i = 0, uu; i < this.uus.length; ++i)
    {
        uu = this.uus[i];

        if(uu.removed)
        {
            this.uus.splice(i, 1);

            this.toSpawn += 1 / (this.score + 2) * 2 + 1;

            --i;

            continue;
        }

        uu.update();

        if(!uu.exploded && uu.collide(564))
        {
            uu.explode();

            this.damage(2);
        }
    }
};
// function setScore(int score):@Chainable
UUMatter.prototype.setScore = function(score)
{
    this.score = score;

    this.scoreSpan.css('display', (this.score === 0)? 'none' : 'block').text('x '+ this.score);
};
// function setBestScore(int score):@Chainable
UUMatter.prototype.setBestScore = function(score)
{
    this.bestScore = score;

    if(localStorage)
    {
        localStorage.setItem('UUMatterBestScore', this.bestScore);
    }
};
// function damage(int damage):void
UUMatter.prototype.damage = function(damage)
{
    if(damage >= this.life)
    {
        this.life = 0;

        this.stop();
    }
    else
    {
        this.life -= damage;
    }

    var size = this.life * 3 +'px';

    this.css('boxShadow', '0 0 '+ Math.max(this.life * 6, 4) +'px #322,'+ size +' 0 0 #911,0 '+ size +' 0 #911,-'+ size +' 0 0 #911,0 -'+ size +' 0 #911,inset 0 0 '+ ((20 - this.life) * 5) +'px #700')
};
// function spawnUU():void
UUMatter.prototype.spawnUU = function()
{
    var uu = new UU(this);

    var pos = (564 - 32) / 2;
    uu.setPos(pos, pos);

    this.uus.push(uu.insert(this));

    var self = this;

    this.uuFabricator.className('uu-fabricator on');

    setTimeout(function()
    {
        self.uuFabricator.className('uu-fabricator');
    }, 350);
};
fus.extend(UUMatter, Builder);

// class UU extends Builder
function UU(uuMatter)
{
    this.super('span');

    this.uuMatter = uuMatter; // :UUMatter

    this.x = 0; // :int
    this.y = 0; // :int

    this.aX = (Math.random() * 2 - 1) / 16.6; // :float
    this.aY = (Math.random() * 2 - 1) / 16.6; // :float

    this.lastUpdate = Date.now(); // :long

    this.exploded = false; // :boolean
    this.removed = false; // :boolean

    var self = this;

    this.className('uu')
        .event('mouseup', function()
        {
            if(!this.exploded)
            {
                self.removed = true;

                self.uuMatter.setScore(self.uuMatter.score + 1);

                self.className('uu-ghost')
                    .setPos(15, 30);

                setTimeout(function()
                {
                    self.className('uu')
                        .css('opacity', '0');

                    setTimeout(function()
                    {
                        self.remove();

                    }, 450);

                }, 200);
            }
        });
}
// function update():void
UU.prototype.update = function()
{
    var now = Date.now();

    var diff = now - this.lastUpdate;

    this.setPos(this.aX * diff + this.x, this.aY * diff + this.y);

    this.lastUpdate = now;
};
// function explode():void
UU.prototype.explode = function()
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
// function collide(int size):boolean
UU.prototype.collide = function(size)
{
    size -= 32;

    return (this.x < 0 || this.x > size || this.y < 0 || this.y > size);
};
// function setPos(int x, int y):@Chainable
UU.prototype.setPos = function(x, y)
{
    this.x = x;
    this.y = y;

    this.css('top', this.x +'px')
        .css('left', this.y +'px');

    return this;
};
fus.extend(UU, Builder);
