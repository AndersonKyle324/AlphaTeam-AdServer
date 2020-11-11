const url = require('url')

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active')

// Serialize URL
console.log(myUrl.href)
console.log(myUrl.toString())

// Host (root domain)
console.log(myUrl.host)

// Host name (does not get port)
console.log(myUrl.hostname)

// Path name 
console.log(myUrl.pathname)

// Serialize query 
console.log(myUrl.search)

// Params Object
console.log(myUrl.searchParams)

//Add param
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams)

myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`))
