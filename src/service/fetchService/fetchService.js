export function getProductById(id) {
    return fetch(process.env.REACT_APP_API_URL + '/products/' + id)
        .then(response => response.json())
}

export function getProducts() {
    return fetch(process.env.REACT_APP_API_URL + '/products/')
        .then(response => response.json())
}

export function getButterflies() {
    return fetch(process.env.REACT_APP_API_URL + '/products/butterflies')
        .then(response => response.json())
}

export function getInsects() {
    return fetch(process.env.REACT_APP_API_URL + '/products/insects')
        .then(response => response.json())
}

export function getCategories() {
    return fetch(process.env.REACT_APP_API_URL + '/product-types')
        .then(response => response.json())
}

export function getProductsByQueryParam(queryString) {
    return fetch(process.env.REACT_APP_API_URL + '/products/query/' + queryString)
        .then(response => response.json())
}

export function getNRandomProducts(amount) {
    return fetch(process.env.REACT_APP_API_URL + '/products/random-' + amount)
        .then(response => response.json())
}

export function getNRandomFramedProducts(amount) {
    return fetch(process.env.REACT_APP_API_URL + '/products/random-framed-' + amount)
        .then(response => response.json())
}

export function getNRandomNonFramedProducts(amount) {
    return fetch(process.env.REACT_APP_API_URL + '/products/random-non-framed-' + amount)
        .then(response => response.json())
}

export function doRegister(email, password) {
    return fetch(process.env.REACT_APP_API_URL + '/auth/register', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                password: password
            }),
    })
        .then(response => response.json())
}

export function doLogin(email, password) {
    return fetch(process.env.REACT_APP_API_URL + '/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                password: password
            }),

    })
        .then(response => response.json())
}

export function doLogout() {
    return fetch(process.env.REACT_APP_API_URL + '/auth/logout', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.json())
}

export function isUserLoggedIn() {
    return fetch(process.env.REACT_APP_API_URL + '/users/is-logged-in', {
        credentials: 'include'
    })
        .then(response => response.json())
}

export function getShippingAddresses(userEmail) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + userEmail + '/')
        .then(response => response.json())
}

export function updateShippingAddressById(newShippingAddress, id, email) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + id + '/' + email + '/', {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nickName: newShippingAddress.nickName,
                firstName: newShippingAddress.firstName,
                lastName: newShippingAddress.lastName,
                company: newShippingAddress.company,
                addressLineOne: newShippingAddress.addressLineOne,
                addressLineTwo: newShippingAddress.addressLineTwo,
                city: newShippingAddress.city,
                state: newShippingAddress.state,
                zipCode: newShippingAddress.zipCode,
                country: newShippingAddress.country,
                phoneNumber: newShippingAddress.phoneNumber
            }),
    })
        .then(response => response.json())
}

export function saveNewShippingAddress(newShippingAddress, email) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + email + '/', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nickName: newShippingAddress.nickName,
                firstName: newShippingAddress.firstName,
                lastName: newShippingAddress.lastName,
                company: newShippingAddress.company,
                addressLineOne: newShippingAddress.addressLineOne,
                addressLineTwo: newShippingAddress.addressLineTwo,
                city: newShippingAddress.city,
                state: newShippingAddress.state,
                zipCode: newShippingAddress.zipCode,
                country: newShippingAddress.country,
                phoneNumber: newShippingAddress.phoneNumber
            }),
    })
        .then(response => response.json())
}

export function deleteShippingAddressById(id, email) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + id + '/' + email + '/', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function getProductByMainCategory(category, page, limit) {
    return fetch(process.env.REACT_APP_API_URL + '/product-types/main-category/' + category + '/' + page + '/' + limit)
        .then(response => response.json())
}

export function getProductBySubCategory(category, page, limit) {
    return fetch(process.env.REACT_APP_API_URL + '/product-types/sub-category/' + category + '/' + page + '/' + limit)
        .then(response => response.json())
}

export function getSlideshowPictures() {
    return fetch(process.env.REACT_APP_API_URL + '/slideshow')
        .then(response => response.json())
}


export function getProductByMainCategoryAndColour(category, colour) {
    return fetch(process.env.REACT_APP_API_URL + '/product-types/main-category/' + category + '?colour=' + colour)
        .then(response => response.json())
}

export function getProductByMainCategoryAndOrigin(category, origin) {
    return fetch(process.env.REACT_APP_API_URL + '/product-types/main-category/' + category + '?origin=' + origin)
        .then(response => response.json())
}

export function getProductByMainCategoryAndPrice(category, page, limit, price) {
    return fetch(process.env.REACT_APP_API_URL + '/product-types/main-category/' + category + '/' + page + '/' + limit + '?price=' + price)
        .then(response => response.json())
}

export function getProductColours() {
    return fetch(process.env.REACT_APP_API_URL + '/products/colours')
        .then(response => response.json())
}

export function getProductOrigins() {
    return fetch(process.env.REACT_APP_API_URL + '/products/origins')
        .then(response => response.json())
}


