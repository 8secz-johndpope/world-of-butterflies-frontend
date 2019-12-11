export function getProductById(id) {
    return fetch('http://localhost:8080/products/' + id)
        .then(response => response.json())
}

export function getProducts() {
    return fetch('http://localhost:8080/products/')
        .then(response => response.json())
}

export function getButterflies() {
    return fetch('http://localhost:8080/products/butterflies')
        .then(response => response.json())
}

export function getInsects() {
    return fetch('http://localhost:8080/products/insects')
        .then(response => response.json())
}

export function getCategories() {
    return fetch('http://localhost:8080/product-types')
        .then(response => response.json())
}

export function getProductsByQueryParam(queryString) {
    return fetch('http://localhost:8080/products/query/' + queryString)
        .then(response => response.json())
}

export function getNRandomProducts(amount) {
    return fetch('http://localhost:8080/products/random-' + amount)
        .then(response => response.json())
}

export function doRegister(email, password) {
    return fetch('http://localhost:8080/auth/register', {
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
    return fetch('http://localhost:8080/auth/login', {
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


