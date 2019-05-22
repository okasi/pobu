const router = require('express').Router()
const passport = require('passport')
const Booking = require('../models/Booking')

router.route('/add')
	.post(
		passport.authenticate('jwt', { session: false }),
		(req, res) => {

			const newBooking = new Booking({
				host: req.user._id,
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
          req.user.bookings.push(newBooking);
          req.user.save()
          
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

router.route('/accept')
	.post(
    passport.authenticate('jwt', { session: false }),
		(req, res) => {

      console.log(req.body.bookableId)

      Booking.findOneAndUpdate(
        {_id: req.body.bookableId}, 
        {client: req.user._id}
      )

      .then(data => {
        req.user.bookings.push(data);
        req.user.save()
        return res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(res.json(err))
      })

    }
  )

module.exports = router