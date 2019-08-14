var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var compSchema = new Schema({
    height: Number,
    type: {
        lean: {
            weight: Number,
            athlete: {
                name: String,
                position: Number,
                imagePath: String,
            }
        },
        athletic: {
            weight: Number,
            athlete: {
                name: String,
                position: Number,
                imagePath: String
            }
        },
        bulky: {
            weight: Number,
            athlete: {
                name: String,
                position: Number,
                imagePath: String
            }
        }
    }
});

var Comp = mongoose.model('Comp', compSchema);

module.exports = Comp;
