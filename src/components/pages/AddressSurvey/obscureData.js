export const obscureAddress = (address) => {
  // Replace any letter NOT immediately after a word boundary
  // eg. 123 Main St --> 123 M*** S*
  return address.replace(/\B[A-Za-z]/g, '*')
}
export const obscureEmail = (email) => {
  // Replace any char NOT immediately after a word boundary
  // eg. test@email.com --> t***@e****.c**
  return email.replace(/\B./g, '*')
}
export const obscurePhone = (phone) => {
  // Replace any char that has 4+ chars until end
  // eg. 1234567890 --> ******7890
  return phone.replace(/.(?=.{4,}$)/g, '*')
}
