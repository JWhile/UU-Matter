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
    this.uus.push(new UU());
};
fus.extend(UUMatter, Builder);

// class UU extends Builder
function UU()
{
    this.super('span');

    this.className('uu');
}
fus.extend(UU, Builder);
