const PicksService = {

    getAllPicks(db) {
      return db.select('*').from('picks')
    },
  
    insertPick(db, newPick) {
      return db
        .insert(newPick)
        .into('picks')
        .returning('*')
        .then(rows => rows[0])
    },
  
    getById(db, id) {
      return db
        .select('*')
        .from('picks')
        .where({ id })
        .first()
    },
  
    deletePick(db, id) {
      return db
        .delete()
        .from('picks')
        .where({ id })
    },
  
    updatePick(db, id, newPickFields) {
      return db('picks')
        .where({ id })
        .update(newPickFields)
    }
  }
  module.exports = PicksService