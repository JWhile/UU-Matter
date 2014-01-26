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

    this.className('uu-matter')
        .append(new Builder('div')
            .className('uu-fabricator'));
}
// function spawnUU():void
UUMatter.prototype.spawnUU = function()
{
    var pos = (564 - 32) / 2;

    this.uus.push(new UU()
            .css('top', pos +'px')
            .css('left', pos +'px')
            .insert(this));
};
fus.extend(UUMatter, Builder);

// class UU extends Builder
function UU()
{
    this.super('span');

    this.className('uu');
}
fus.extend(UU, Builder);
