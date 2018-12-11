const Monk = require('monk')
const db = Monk('mongodb://loclahost:27017/images')
const images = db.get('images')
console.log(images)