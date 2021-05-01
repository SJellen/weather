import {validateZip} from './helperFunctions'

test('test if zip code is legit', () => {
    expect(validateZip(90210)).toBe(true)
    expect(validateZip(0)).toBe(false)
    expect(validateZip(12345)).toBe(true)   
    expect(validateZip(123)).toBe(false)
})



// npm test -- --coverage