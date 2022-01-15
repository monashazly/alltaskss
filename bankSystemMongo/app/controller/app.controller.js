const dbConnection = require('../../models/db')
const { redirect } = require('express/lib/response')
const mongodb = require('mongodb')
const { partials } = require('handlebars')

const ObjectID = mongodb.ObjectId
class User {
  static addUser = (req, res) => {
    res.render('add')
  }
  static addUserLogic = (req, res) => {
    const user = req.body
    dbConnection((err, client, db) => {
      if (err) return res.redirect('err404')
      db.collection('users').insertOne(user, (err, result) => {
        if (err) return res.redirect('/err')
        client.close()
        res.redirect('/all')
      })
    })
  }
  static showAll = (req, res) => {
    dbConnection((err, client, db) => {
      if (err) return res.redirect('err404')
      db.collection('users')
        .find()
        .toArray((err, result) => {
          if (err) return res.redirect('err404')
          const data = result
          const isEmpty = data.length == 0
          client.close()
          res.render('all', { pageTitle: 'All Users', data, isEmpty })
        })
    })
  }
  static singleUser = (req, res) => {
    let isNotFound = false
    const id = req.params.id
    dbConnection((err, client, db) => {
      db.collection('users').findOne(
        { _id: new ObjectID(id) },
        (err, result) => {
          if (err) return res.redirect('/err')
          const user = result
          client.close()
          res.render('single', { pageTitle: 'single user', user })
        }
      )
    })
  }
  static EditUser = (req, res) => {
    const id = req.params.id
    dbConnection((err, client, db) => {
      db.collection('users').findOne(
        { _id: new ObjectID(id) },
        (err, result) => {
          if (err) return res.redirect('/err404')
          const user = result
          res.render('edituser', { pageTitle: 'Edit user', user })
          client.close()
        }
      )
    })
  }
  static EditUserLogic = (req, res) => {
    const id = req.params.id
    const user = req.body
    dbConnection((err, client, db) => {
      db.collection('users').replaceOne(
        { _id: new ObjectID(id) },
        user,
        (err, result) => {
          if (err) return res.redirect('/err404')
          client.close()
          res.redirect('/all')
        }
      )
    })
  }
  static DeleteUser = (req, res) => {
    const id = req.params.id
    dbConnection((err, client, db) => {
      db.collection('users').deleteOne(
        { _id: new ObjectID(id) },
        (err, result) => {
          if (err) return res.redirect('/err404')
          client.close()
          res.redirect('/all')
        }
      )
    })
  }
  static AddMoney = (req, res) => {
    res.render('addt')
  }
  static addMoneyLogic = (req, res) => {
    const id = req.params.id
    const value = req.body.value
    dbConnection((err, client, db) => {
    //   db.collection("users").findOne({_id:new ObjectID(id)},(err,result)=>{
    //       if(err) return res.redirect("/err404")
    //       const user=result
    //       const intiall=parseInt(user.intial)
    //       user.added=parseInt(value)
    //       user.total=parseInt(value)+intiall
    //        console.log(user)
    //   })
    async function run() {
        const user=  await db.collection("users").findOne({_id:new ObjectID(id)})
       return user
        
      }
const user=run()


      db.collection('users').updateOne(
        { _id: new ObjectID(id) },
        {
          $set: {
            added: parseInt(value),
            
            // total:added+intial
          }
        },
        (err, result) => {
          if (err) return res.redirect('/err404')
          client.close()
          // console.log(user)

          res.redirect('/all')
        }
      )
    })
  }

  static withdraw = (req, res) => {
    res.render('withdrawt')
  }
  static withdrawLogic = (req, res) => {
    const id = req.params.id
    const value = req.body.value
    dbConnection((err, client, db) => {
      db.collection('users').updateOne(
        { _id: new ObjectID(id) },
        {
          $set: {
            withdrawed: parseInt(value)
          }
        },
        (err, result) => {
          if (err) return res.redirect('/err404')
          client.close()

          res.redirect('/all')
        }
      )
    })
  }
}
module.exports = User
