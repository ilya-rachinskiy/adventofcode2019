const p = require('./password-validator').PasswordValidator;
let counter = 0;
let res = [];
for (let index = 245318; index <= 765747; index++) {

    res.push(new p(index).isOk())


}

// console.log(res.filter(x => !x.isSorted && x.isDoubled).length)
// console.log(res.filter(x => !x.isDoubled && x.isSorted))
// console.log(res.filter(x => !x.isDoubled && !x.isSorted))
console.log(res.filter(x => x.isDoubled && x.isSorted).length)
// console.log(counter);
// console.log(new p(230000).isOk());