const router = require('express').Router()
const passport = require('passport')
const Booking = require('../models/Booking')

router.route('/add')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      const newBooking = new Booking({
        _host: req.user._id,
        name: req.body.name,
        date: req.body.date,
        duration: req.body.duration,
        fee: req.body.fee,
        nanoWalletPublicKey: req.body.nano,
        communication: req.body.communication,
      });

      newBooking.save()
        .then(booking => {
          res.json(booking)
          // req.user.bookings.push(newBooking);
          // req.user.save()

        })
        .catch(err => {
          console.log(err);
          res.status(500).send(res.json(err))
        })
    })


router.route('/check')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Booking.findById(req.body.bookableId)
        .then(data => {
          return res.json(data)
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(res.json(err))
        })

    }
  )


router.route('/host')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    Booking.find({ _host: req.user._id })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(res.json(err))
      })
  })


router.route('/client')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    Booking.find({ _client: req.user._id })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(res.json(err))
      })
  })


router.route('/accept')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      Booking.findOneAndUpdate(
        { _id: req.body.bookableId },
        { _client: req.user._id }
      )

        .then(data => {
          // req.user.bookings.push(data);
          // req.user.save();
          io.emit('RECEIVE_UPDATE', data);
          return res.json(data)
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(res.json(err))
        })

    }
  )

router.route('/unbook')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      Booking.findOne(
        { _id: req.body.bookableId }
      )
        .then(data => {
          data._client = undefined
          data.save()
          io.emit('RECEIVE_UPDATE', data);
          return res.json(data)
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(res.json(err))
        })

    }
  )

router.route('/delete')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

      Booking.findOneAndRemove(
        {
          _id: req.body.bookableId,
          _host: req.user._id,
        }
      )
        .then(data => {
          return res.json(data)
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(res.json(err))
        })

    }
  )

module.exports = router