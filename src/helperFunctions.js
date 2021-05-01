export function validateZip(zipCode) {
    let regex = /[0-9]{5}/
    return regex.test(zipCode)
}

