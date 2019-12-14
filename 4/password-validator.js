
class PasswordValidator {

    constructor(input) {
        this.digits = input.toString().split('').map(x => (parseInt(x, 10)));
    }

    isOk() {
        const isSorted = this.digits.join('') === [...this.digits].sort((a, b) => a - b).join('')


        // let isDoubled = false;
        const dict = {};
        for (let index = 0; index < this.digits.length - 1; index++) {


            if (this.digits[index] == this.digits[index + 1]) {

                dict[this.digits[index]] = (dict[this.digits[index]] || 1) + 1;
            }

        }
        let isDoubled = Object.keys(dict).some(x => (dict[x] == 2))
        return { isSorted, isDoubled, value: this.digits.join('') }

    }
    log() {
        console.log(this.digits)
    }
}
module.exports = { PasswordValidator };