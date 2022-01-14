const createMyOwnElement = (
  el,
  parent,
  classes = '',
  textContent = '',
  attributes = []
) => {
  const element = document.createElement(el)
  parent.appendChild(element)
  if (classes != '') element.classList = classes
  if (textContent != '') element.textContent = textContent
  attributes.forEach(attribute => {
    element.setAttribute(attribute.attrName, attribute.attrValue)
  })
  return element
}
const user = {}
const readDataFromStorage = () => {
  let data
  try {
    data = JSON.parse(localStorage.getItem('Customers'))
    if (!Array.isArray(data)) throw new Error("data isn't array")
  } catch (exp) {
    data = []
  }
  return data
}
const readDataFromStorage2 = () => {
  let data
  try {
    data = JSON.parse(localStorage.getItem('trans'))
    if (!Array.isArray(data)) throw new Error("data isn't array")
  } catch (exp) {
    data = []
  }
  return data
}
const setDatatoLocalStorage = myData => {
  if (!Array.isArray(myData)) myData = []
  myData = JSON.stringify(myData)
  localStorage.setItem('Customers', myData)
}
const setDatatoLocalStorage2 = myData => {
  if (!Array.isArray(myData)) myData = []
  myData = JSON.stringify(myData)
  localStorage.setItem('trans', myData)
}
const frm = document.querySelector('#frmm')
const datacustom = readDataFromStorage()

customerheads = [
  { name: 'accnum', dataStore: 'value', default: null, isDefault: true },
  { name: 'username', DataStore: 'value', default: null, isDefault: false },
  { name: 'phone', DataStore: 'value', default: null, isDefault: false },
  { name: 'intial', DataStore: 'value', default: null, isDefault: false },
  { name: 'address', DataStore: 'value', default: null, isDefault: false }
]

if (frm) {
  let IDs = datacustom.length
  console.log(IDs)
  Accnum = []
  start = 5000
  for (let i = 0; i < datacustom.length; i++) {
    start++
  }

  frm.addEventListener('submit', function (e) {
    e.preventDefault()

    customerheads.forEach(head => {
      if (head.isDefault) {
        user[head.name] = start
      } else user[head.name] = this.elements[head.name][head.DataStore]
    })
    datacustom.push(user)
    this.reset()

    setDatatoLocalStorage(datacustom)
    window.location.replace('index.html')
  })
}
const tb = document.querySelector('#tablebody')
const addNew = document.querySelector('#addnew')
drawItem = function () {
  addNew.addEventListener('click', function () {
    window.location.replace('add.html')
  })

  let datacustom = readDataFromStorage()
  tb.innerHTML = ''
  if (datacustom.length == 0) {
    const tr = createMyOwnElement('tr', tb, 'alert alert-danger text-center')
    createMyOwnElement('td', tr, '', 'No Users Yet', [
      { attrName: 'colspan', attrValue: 6 }
    ])
  } else {
    //    console.log(datacustom)
    datacustom.forEach(cu => {
      const tr = createMyOwnElement('tr', tb, 'text-center')
      customerheads.forEach(head => {
        const td = createMyOwnElement('td', tr, '', cu[head.name])
      })
      let datacustom = readDataFromStorage()
      console.log(datacustom)
      const td = createMyOwnElement('td', tr)
      const Delbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-danger m-auto me-1',
        'Delete'
      )
      Delbtn.addEventListener('click', function () {
        delData = datacustom.filter(s => s.accnum !== cu.accnum)
        setDatatoLocalStorage(delData)
        drawItem()
      })
      const Edbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-warning m-auto me-1',
        'Edit'
      )
      Edbtn.addEventListener('click',function(){
          edit(cu)
      })
      const showbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-primary m-auto me-1',
        'Show'
      )
      showbtn.addEventListener('click', function () {
        show(cu)
      })
      const addwith = createMyOwnElement(
        'button',
        td,
        'btn btn-success m-auto',
        'Add/Withdraw'
      )
      addwith.addEventListener('click', function (e) {
        data = datacustom.find(u => u.accnum == cu.accnum)
        console.log(user.accnum)
        console.log(data)
        setDatatoLocalStorage2( data)
        // window.location.replace('addwith.html')
      })
    })
  }
}
show=function(user){
localStorage.setItem('user',JSON.stringify(user) )
window.location.replace('show.html')
}
if (tb) drawItem()
transheads = [
  { name: 'deposite', dataStore: 'checked' },
  { name: 'withdraw', dataStore: 'chec ked' },
  { name: 'Value', dataStore: 'value' }
]
const trans = {}
const transActions = readDataFromStorage2()
const back = document.querySelector('#back')
if (back) {
  back.addEventListener('click', function () {
    window.location.replace('show.html')
  })
  const form2 = document.querySelector('#frm2')
  form2.addEventListener('submit', function (e) {
    e.preventDefault()
    transheads.forEach(head => {
      trans[head.name] = this.elements[head.name][head.dataStore]
    })
    transActions.push(trans)
    console.log(transActions)
    this.reset()
    setDatatoLocalStorage2(transActions)
  })
}
allheads = [
  { name: 'username', DataStore: 'value' },
  { name: 'phone', DataStore: 'value' },
  { name: 'intial', DataStore: 'value' },
  { name: 'address', DataStore: 'value' },
  { name: 'deposite', dataStore: 'checked' },
  { name: 'withdraw', dataStore: 'checked' },
  { name: 'Value', dataStore: 'value' }
]
const showtable = document.querySelector('#showtable')
if (showtable) {
    let user=JSON.parse(localStorage.getItem('user'))
 
    //    console.log(datacustom)
    datacustom.forEach(cu => {
      const tr = createMyOwnElement('tr', showtable, 'text-center')
      customerheads.forEach(head => {
        const td = createMyOwnElement('td', tr, '', cu[head.name])
      })
      let datacustom = readDataFromStorage()
      console.log(datacustom)
      const td = createMyOwnElement('td', tr)
      const Delbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-danger m-auto me-1',
        'Delete'
      )
      Delbtn.addEventListener('click', function () {
        delData = datacustom.filter(s => s.accnum !== cu.accnum)
        setDatatoLocalStorage(delData)
        drawItem()
      })
      const Edbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-warning m-auto me-1',
        'Edit'
      )
      const showbtn = createMyOwnElement(
        'button',
        td,
        'btn btn-primary m-auto me-1',
        'Show'
      )
      const addwith = createMyOwnElement(
        'button',
        td,
        'btn btn-success m-auto',
        'Add/Withdraw'
      )
      addwith.addEventListener('click', function (e) {
        data = datacustom.find(u => u.accnum == cu.accnum)
        console.log(user.accnum)
        console.log(data)
        setDatatoLocalStorage2(data)
        // window.location.replace('addwith.html')
      })
    })
  }

// if(showtable){
// let transActions=readDataFromStorage2()
// let datacustom=readDataFromStorage()
// let all=transActions.concat(datacustom)
// console.log(all)
// const showtable=document.querySelector('#showtable')
// if(all.length==0){
//     const tr=createMyOwnElement('tr',showtable,"alert alert-danger text-center")
//     createMyOwnElement('td',tr,'','No Users Yet',[{attrName:'colspan',attrValue:6}])

// }
// else{
//     all.forEach(one=>{
//         const tr=createMyOwnElement('tr',showtable)
//         allheads.forEach(head=>{
//             createMyOwnElement('td',tr,'',one[head.name])
//         })

//     })
// }
