const express = require('express');

// require the Drone model here
const Drone = require('../models/Drone.model.js')

const router = express.Router();

router.get('/drones', (req, res, next) => {
    Drone.find()
    .then((drones) => {
      res.render('drones/list.hbs', {drones})
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get('/drones/create', (req, res, next) => {
    res.render('drones/create-form.hbs')
  
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { droneName, dronePropellers, droneMaxSpeed } = req.body
  let newDrone = {
      name: droneName,
      propellers: dronePropellers,
      maxSpeed: droneMaxSpeed
  }

    Drone.create(newDrone)
    .then(() => {
      res.redirect('/drones')
    })
    .catch((err) => {
      console.log(err)
      res.render('drones/create-form.hbs', {msg: 'Something went wrong, please try again'})
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
    let id = req.params.id
    Drone.findById(id)
    .then(drone => {
      res.render('drones/update-form.hbs', {drone})
    })
    .catch((err) => {
      console.log(err)
    })
    
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id
  const { droneName, dronePropellers, droneMaxSpeed } = req.body
  let editedDrone = { name: droneName, propellers: dronePropellers, maxSpeed: droneMaxSpeed }

  Drone.findByIdAndUpdate(id, editedDrone)
  .then(() =>{
    res.redirect('/drones')
  })
  .catch((err) => {
    console.log(err)
    res.render('drones/update-form.hbs', {drone: editedDrone, msg: 'Something went wrong, please try again'})
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let id = req.params.id
  Drone.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/drones')
  })
  .catch((err) => {
    console.log(err)
  })
});

module.exports = router;
