const fs = require('fs')
const { redirect } = require('express/lib/response')
const console = require('console')
const req = require('express/lib/request')

const ReadFromJson = () => {
  let data
  try {
    data = JSON.parse(fs.readFileSync('./models/data.json'))
    if (!Array.isArray(data)) throw new Error('data is not array')
  } catch (e) {
    console.log(e.message)
    data = []
  }
  return data
}
const writeDataToJson = data => {
  try {
    fs.writeFileSync('./models/data.json', JSON.stringify(data))
  } catch (e) {
    console.log(e.message)
  }
}

class User {
  static searchUserIndex = (id, data) => {
    const index = data.findIndex(u => u.id == id)
    return index
  }
  static add = (req, res) => {
    res.render('add', { pageTitle: 'Add User Post' })
  }

  static addUserLogic = (req, res) => {
    let data = ReadFromJson()
    let user = req.body
    const id=req.params.id
    if (data.length == 0) user.id = 1
    else user.id = data[data.length - 1].id + 1
    // const userindex=this.searchUserIndex(id,data)
    // const initial=data[userindex].intial
    // console.log(initial)
    // data[userindex].totalbalance=intial

    data.push(user)
    writeDataToJson(data)

    res.redirect('/all')
  }
  static showAll = (req, res) => {
    const data = ReadFromJson()
    const isEmpty = data.length == 0

    res.render('all', { pageTitle: 'All Users', data, isEmpty })
  }
  static edituser = (req, res) => {
    const id = req.params.id
    const data = ReadFromJson()
    const userIndex = this.searchUserIndex(id, data)
    res.render('edituser', { pageTitle: 'Edit User', user: data[userIndex] })
  }
  static editUserLogic = (req, res) => {
    const data = ReadFromJson()
    const id = req.params.id
    const user = { id, ...req.body }
    const userIndex = this.searchUserIndex(id, data)
    data.splice(userIndex, 1, user)
    writeDataToJson(data)

    res.redirect('/all')
  }
  static single = (req, res) => {
    const id = req.params.id
    const data = ReadFromJson()
    const userIndex = this.searchUserIndex(id, data)

    res.render('single', { pageTitle: 'User Info', user: data[userIndex] })
  }
  static Delete = (req, res) => {
    const id = req.params.id
    const data = ReadFromJson()
    const userindex = this.searchUserIndex(id, data)
    data.splice(userindex, 1)
    writeDataToJson(data)
    res.redirect('/all')
  }
  static addwithDraw=(req,res)=>{

    res.render("addWithdraw")

  }
  // static addwithDrawLogic=(req,res)=>{
  //   // req.body.add=Boolean(req.body.add);
  //   // console.log(req.body.add)
  //   // req.body.withdraw=Boolean(req.body.withdraw);
  //   // console.log(req.body.withdraw)
  //   const result= req.body.add1
  //   console.log(result)

    

  // }
  static addMoney=(req,res)=>{
    const id=req.params.id
   
    res.render('addt')

  }
  static addMoneyLogic=(req,res)=>{
    const value=req.body.value
    const id=req.params.id
    let data=ReadFromJson()
    const userIndex=this.searchUserIndex(id,data)
    data[userIndex].added=value
    const intial=parseInt( data[userIndex].intial)
    data[userIndex].totalbalance=parseInt(value)+intial
  
    writeDataToJson(data)
    res.redirect("/all")
    // console.log(value)

    
  }
  static withdraw=(req,res)=>{
    res.render("withdrawt")
  }
  static withdrawLogic=(req,res)=>{
    const id=req.params.id
    let data=ReadFromJson()
    const userIndex=this.searchUserIndex(id,data)
    const value=req.body.value
    data[userIndex].withdrawed=value
    const total=parseInt( data[userIndex].totalbalance)
    data[userIndex].totalbalance=total-parseInt(value)
    writeDataToJson(data)
    res.redirect("/all")
  }
}
module.exports = User
