const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  beerStyle: {
    type: String,
    required: true
  },
  abv: {
    type: Number,
    min: 0
  },
  brewer: {
    type: String
    // required: true
  },
  brewerCountry: {
    type: String
  },
  consumptionType: {
    type: String
  },
  personalRatingNum: {
    type: Number,
    min: 0,
    max: 5
  },
  ratingDescription: {
    type: String
  },
  purchasedLocation: {
    type: String
  },
  purchasedPrice: {
    type: Number,
    min: 0
  },
  purchasedDate: {
    type: Date
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Beer', beerSchema)
