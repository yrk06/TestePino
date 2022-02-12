const {parse:parseData, validateCEP, validateCPF} = require('../dataValidation/validators.js')

test("Parsing CPF", () => {
    expect(parseData("059.172.670-06")).toBe("05917267006")
})

test("CPF Valido", () => {
    expect(validateCPF("05917267006")).toBe(true)
    expect(validateCPF("05917267018")).toBe(false)
    expect(validateCPF("11111111111")).toBe(false)
})