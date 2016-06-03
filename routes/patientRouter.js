var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Patients = require('../models/patients');
var Verify = require('./verify');

var patientRouter = express.Router();
patientRouter.use(bodyParser.json());

patientRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.find({owner : req.decoded._id})
        .exec(function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.create(req.body, function (err, patient) {
        if (err) return next(err);

        patient.owner = req.decoded._id;

        patient.save(function (err, patient) {
            if (err) return next(err);
            
            console.log('Patient created!');
            var id = patient._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the patient with id: ' + id);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Patients.remove({owner : req.decoded._id}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

patientRouter.route('/:patientId')
.get(function (req, res, next) {
    Patients.findById(req.params.patientId, function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.put(function (req, res, next) {
    Patients.findByIdAndUpdate(req.params.patientId, {
        $set: req.body
    }, {
        new: true
    }, function (err, patient) {
        if (err) return next(err);
        res.json(patient);
    });
})

.delete(function (req, res, next) {
    Patients.findByIdAndRemove(req.params.patientId, function (err, resp) {        
      if (err) return next(err);
        res.json(resp);
    });
});

//Export router
module.exports = patientRouter;