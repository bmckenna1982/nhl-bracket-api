const express = require('express')
const PicksService = require('./picks-services')

const picksRouter = express.Router()
const jsonParser = express.json()

picksRouter
  .route('/')
  .get((req, res, next) => {
    PicksService.getAllPicks(req.app.get('db'))
      .then(picks => {
        res.json(picks)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { game_id, user_id, pick_winner, pick_duration } = req.body
    const newPick = { game_id, user_id, pick_winner, pick_duration }
    for (const [key, value] of Object.entries(newPick)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }
    
    PicksService.insertPick(req.app.get('db'), newPick)
      .then(pick => {
        res.status(201).location(`/picks/${pick.id}`).json(pick)
      })
      .catch(next)
  })
  

picksRouter
  .route('/:pick_id')
  .get((req, res, next) => {
    PicksService.getById(req.app.get('db'), req.params.pick_id)
      .then(pick => {
        if (!pick) {
          return res.status(404).json({
            error: { message: `Pick doesn't exist` }
          })
        }
        res.json(pick)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    PicksService.deletePick(req.app.get('db'), req.params.pick_id)
      .then(() => {
        res.status(204).end
      })
      .catch(next)
  })

module.exports = picksRouter