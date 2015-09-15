var SPEED = 4;

function createPlatform(x, y, w, h, color) {
    Crafty.e('Floor, 2D, Canvas, Color')
        .attr({x: x, y: y, w: w, h: h})
        .color(color);
}

function createGround(color) {
    createPlatform(-99999, 440, 999999, 100, color);
}

function createCharacter() {
    var walker = Crafty.e('2D, Canvas, walker_start, SpriteAnimation, Twoway, Gravity')
    .attr({x: 0, y: 0 })
    .twoway(SPEED)
    .gravity('Floor')
    .bind('KeyDown', function(e) {
        if(e.key == Crafty.keys.LEFT_ARROW) {
            walker.animate("walking-backwards", -1);
        } else if (e.key == Crafty.keys.RIGHT_ARROW) {
            walker.animate("walking", -1);
        } else if (e.key == Crafty.keys.UP_ARROW) {
            Crafty.audio.play("jump")
        } else if (e.key == Crafty.keys.DOWN_ARROW) {

        }
    })
    .bind('KeyUp', function(e) {
        walker.animate("stopping", 1);
    });

    walker.reel("stopping", 100, [
        [5, 1], [6, 1], [7, 1]
    ]);

    walker.reel("walking", 1000, [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1]
    ]);

    walker.reel("walking-backwards", 1000, [
        [0, 0], [2, 0], [4, 0], [6, 0],
        [0, 1], [2, 1], [4, 1], [6, 1]
    ]);
    return walker;
}

function loadAssets() {
    var assetsObj = {
        "sprites": {
            // This spritesheet has 16 images, in a 2 by 8 grid
            // The dimensions are 832x228
            "glitch_walker.png": {
                // This is the width of each image in pixels
                tile: 104,
                // The height of each image
                tileh: 114,
                // We give names to three individual images
                map: {
                    walker_start: [0, 0],
                    walker_middle: [7, 0],
                    walker_end: [7, 1]
                }
            }
        },
        "audio": {
            "jump": ["jump.mp3"]
        }
    };

    Crafty.load(assetsObj);
}

window.onload = function() {
    var rootElement = document.getElementById('game');
    Crafty.init(window.innerWidth - 1, window.innerHeight - 1, rootElement);
    loadAssets();
    createGround('green');
    createPlatform(100, 300, 100, 5, 'red');
    createPlatform(300, 200, 100, 5, 'red');
    createCharacter();
};
