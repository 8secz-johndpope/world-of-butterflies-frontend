export function getProductById(id) {
    return fetch(process.env.REACT_APP_API_URL+'/products/' + id)
        .then(response => response.json())
}

export function getProducts() {
    return fetch(process.env.REACT_APP_API_URL+'/products/')
        .then(response => response.json())
}

export function getButterflies() {
    return fetch(process.env.REACT_APP_API_URL+'/products/butterflies')
        .then(response => response.json())
}

export function getInsects() {
    return fetch(process.env.REACT_APP_API_URL+'/products/insects')
        .then(response => response.json())
}

export function getCategories() {
    return fetch(process.env.REACT_APP_API_URL+'/product-types')
        .then(response => response.json())
}

export function getProductsByQueryParam(queryString) {
    return fetch(process.env.REACT_APP_API_URL+'/products/query/' + queryString)
        .then(response => response.json())
}

export function getNRandomProducts(amount) {
    return fetch(process.env.REACT_APP_API_URL+'/products/random-' + amount)
        .then(response => response.json())
}

export function doRegister(email, password) {
    return fetch(process.env.REACT_APP_API_URL+'/auth/register', {
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
    return fetch(process.env.REACT_APP_API_URL+'/auth/login', {
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

export function getUserEmail() {
    return fetch(process.env.REACT_APP_API_URL+'/users/email',{
        credentials:'include'
    })
        .then(response => response.json())
}


