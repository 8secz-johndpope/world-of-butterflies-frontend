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

