var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost: 27017/shopping');


var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Gothic Video Game',
        description: 'Awesome Game',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg',
        title: 'Destiny Video Game',
        description: 'beautiful game',
        price: 16
    }),
    new Product ({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg',
        title: 'super smash  Video Game',
        description: 'best game',
        price: 26
    }),
    new Product ({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
        title: 'The legend of Zelda Video Game',
        description: 'better game',
        price: 30
    }),
    new Product ({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg',
        title: 'Monster hunter Video Game',
        description: 'adventure game',
        price: 37
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/a/ad/DBFZ_cover_art.jpg',
        title: 'Dragon Video Game',
        description: 'curious game',
        price: 39
    })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    })
}
function exit() {
    mongoose.disconnect();
}