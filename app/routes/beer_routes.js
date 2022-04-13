// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for beers
const Beer = require('../models/beer')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existent document is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /beers
router.get('/beers', requireToken, (req, res, next) => {
  Beer.find()
    .then(beers => {
      // `beers` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return beers.map(beer => beer.toObject())
    })
  // respond with status 200 and JSON of the beers
    .then(beers => res.status(200).json({ beers: beers }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /beers/6256dbf1c427fc39ec9933f5
router.get('/beers/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Beer.findById(req.params.id)
    .then(handle404)
  // if `findById` is successful, respond with 200 and "beer" JSON
    .then(beer => res.status(200).json({ beer: beer.toObject() }))
  // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /beers
// Create: POST /events save the beer data
// require token/signed-in user before creating a beer
router.post('/beers', requireToken, (req, res, next) => {
  // reference the request data stored on the req object by the 'express.json()' middleware
  const beer = req.body.beer

  // set owner of new beer to be current user
  beer.owner = req.user.id

  Beer.create(beer)
  // respond to successful `create` with status 201 and JSON of new "beer"
    .then(beer => {
      res.status(201).json({ beer: beer.toObject() })
    })
  // if an error occurs, pass it off to our error handler
  // the error handler needs the error message and the `res` object so that it
  // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /beers/6256dbf1c427fc39ec9933f5
router.patch('/beers/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new owner, prevent that by deleting that key/value pair
  delete req.body.beer.owner
  // get the id out of the url
  const id = req.params.id
  // get the updated data out of req.body
  const beerData = req.body.beer
  // find the beer
  Beer.findById(id)
    .then(handle404)
    .then(beer => requireOwnership(req, beer))
    // update it and save it
    .then(beer => {
      // Object.assign(beer, beerData)
      // return beer.save()
      return beer.updateOne(beerData)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /beers/6256dbf1c427fc39ec9933f5
router.delete('/beers/:id', requireToken, (req, res, next) => {
  Beer.findById(req.params.id)
    .then(handle404)
    .then(beer => {
      // throw an error if current user doesn't own `beer`
      requireOwnership(req, beer)
      // delete the beer ONLY IF the above didn't throw
      beer.deleteOne()
    })
  // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
  // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
