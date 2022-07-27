'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  //username:'js'
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  //username:"ss"
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currentAccount = undefined

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////


const updateUI = function (acc) {
  updateMovements(acc)
  updateSummary(acc)
  updateBal(acc)
}





const updateMovements = function (acc) {
  containerMovements.innerHTML = ""
  acc.movements.forEach(function (mov, index) {
    let type = mov > 0 ? 'deposit' : 'withdrawal'
    let html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1}${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>`
    containerMovements.insertAdjacentHTML('beforeend', html)

  })

}

const updateSummary = function (acc) {
  // income
  let income = acc.movements.filter(function (el) {
    return el > 0
  }).reduce(function (acc, el) {
    return acc + el
  }, 0)
  console.log(income)
  labelSumIn.textContent = `${income}€`


  let withdrawal = acc.movements.filter(function (el) {
    return el < 0
  }).reduce(function (acc, el) {
    return acc + el
  }, 0)
  console.log(withdrawal)
  labelSumOut.textContent = `${withdrawal}€`

  let interest = income * 0.10
  acc.interest = interest
  labelSumInterest.textContent = `${interest}€`

}

const updateBal = function (acc) {
  let sum = acc.movements.reduce(function (acc, el) {
    return acc + el
  }, 0)
  labelBalance.textContent = `${acc.interest + sum}€`
  acc.currentBalance = sum
}


const createUserName = function (accs) {
  accs.forEach(obj => {
    obj.username = obj.owner.split(' ').map(function (el) {
      return el[0]
    }).join('').toLowerCase()
  });

}
createUserName(accounts)
console.log(accounts)


// login event

btnLogin.addEventListener('click', function (event) {
  event.preventDefault()
  let userInputUsername = inputLoginUsername.value
  let userInputPassword = inputLoginPin.value
  currentAccount = accounts.find(function (el) {
    return el.username == userInputUsername && el.pin == userInputPassword
  })
  //console.log(currentAccount)
  if (currentAccount) {
    containerApp.style.opacity = "100"
    inputLoginUsername.value = ""
    inputLoginPin.value = ""
    labelWelcome.textContent = `welcome ${currentAccount.owner.split(' ')[0]} !`
    updateUI(currentAccount)
  }
})
// request loan
btnLoan.addEventListener("click", function (event) {
  event.preventDefault()
  let text = inputLoanAmount.value
  let mov = Number(text)
  currentAccount.movements.push(mov)
  updateUI(currentAccount)
  inputLoanAmount.value = ""

})


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  let receiverUserInput = inputTransferTo.value
  let amount = Number(inputTransferAmount.value)
  let actualReceiverUser = accounts.find(function (el) {
    return el.username == receiverUserInput
  })
  inputTransferTo.value = ""
  inputTransferAmount.value = ""


  if (
    actualReceiverUser &&
    amount > 0 &&
    currentAccount.currentBalance > amount &&
    receiverUserInput.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount)
    actualReceiverUser.movements.push(amount)
    updateUI(currentAccount)

  }


})


btnClose.addEventListener('click', function (event) {
  console.log('hello')
  event.preventDefault()
  let userInputDelete = inputCloseUsername.value
  let userInputPin = Number(inputClosePin.value)
  console.log(userInputDelete)
  console.log(userInputPin)
  console.log(currentAccount.username)
  console.log(currentAccount.pin)

  if (currentAccount.username == userInputDelete && currentAccount.pin == userInputPin) {
      console.log("in")
    let deleteUserIndex = accounts.findIndex(function (el) {
      return el.username == userInputDelete
    })

    if (deleteUserIndex >= 0) {
      accounts.splice(deleteUserIndex, 1)
      containerApp.style.opacity = "0";
    }

  }

})


















// Event handler one 
// btnLogin.addEventListener('click',function(e){
//   e.preventDefault()
//   let userInputUserName = inputLoginUsername.value
//   let userInputPin = inputLoginPin.value
//   let currentAccount = accounts.find(function(acc){
//     return acc.username == userInputUserName && acc.pin == userInputPin
//   })
//   if(currentAccount){
//     containerApp.style.opacity = "100"
//     inputLoginUsername.value = ""
//     inputLoginPin.value = ""
//     labelWelcome.textContent = `Welcome back ,${currentAccount.owner.split(' ')[0]}`

//   }

// })

























































// // logic

// // function to createUser name
// function createUserName(word){
//   let a = word.split(" ") // ["chinmay","deshpande"]
//   let b = a.map(function(el){  //['c','d']
//     return el[0]
//   })
//   let c = b.join("") //"cd"
//   return c
// }
// //createUserName("chinmay deshpande")
// accounts.forEach(function(el){
//   el.userName = createUserName(el.owner).toLowerCase()
// })
// console.log(accounts)

// // totalwithdrawl

// function calculateTotalWithDrawl(arr){
//   arr.forEach(function(el){
//     let a = el.movements.filter(function(el){
//        return el < 0
//     })
//     let b = a.reduce(function(acc,el){
//       return acc + el
//     },0)

//     el.totalDrawl = b

//   })
// }
// calculateTotalWithDrawl(accounts)
// console.log(accounts)

// // calculate total depoit()


// function calculateTotalDepoist(arr){
// arr.forEach(function(el){
//   let a = el.movements.filter(function(el){
//      return el > 0
//   })
//   let b = a.reduce(function(acc,el){
//     return acc + el
//   },0)

//   el.totalDepoist = b

// })
// }
// calculateTotalDepoist(accounts)
// console.log(accounts)
// // calculate current balance()

// function CurrentBalance(arr){
// arr.forEach(function(el){
//   el.currentBal = el.totalDepoist - el.totalDrawl
// })

// }
// CurrentBalance(accounts)
// console.log(accounts)

