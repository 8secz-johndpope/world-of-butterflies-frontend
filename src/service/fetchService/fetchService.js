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

export function getOrderHistory() {
    return fetch(process.env.REACT_APP_API_URL + '/orders', {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}


export function getAllProductsPaginated(page, limit) {
    if (page !== undefined && limit !== undefined) {
        return fetch(process.env.REACT_APP_API_URL + '/secret/admin/products?from=' + page + '&to=' + limit)
            .then(response => response.json())
    } else {
        return fetch(process.env.REACT_APP_API_URL + '/products')
            .then(response => response.json())
    }

}

export function updateProductById(productId, product) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/products/' + productId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    })

}

export function addNewProduct(product) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/products', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
    })
}

export function deleteProductById(productId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/products/' + productId, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getAdditionalProductImagesByProdId(productId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/additional-images/' + productId)
        .then(response => response.json())
}


export function updateAdditionalProductImageById(additImgId, additionalProductImage) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/additional-images/' + additImgId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(additionalProductImage),
    })
}

export function addNewAdditImg(additImg) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/additional-images', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(additImg),
    })
}

export function deleteAdditionalProductImageById(additImageId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/additional-images/' + additImageId, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getMainProductTypes() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/main-types', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export function getSubProductTypes() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/sub-types', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export function getAllCategories() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/categories', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export function addNewCategory(category) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/categories', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    })
}

export function updateCategoryById(categoryId, category) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/categories/' + categoryId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    })
}

export function deleteCategoryById(categoryId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/categories/' + categoryId, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getAllProductOrigins() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/origins', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export function getAllColours() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/colours', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}
export function addNewColour(colour) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/colours', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(colour),
    })
}

export function updateColourById(colourId, colour) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/colours/' + colourId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colour),
    })
}

export function deleteColourById(colourId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/colours/' + colourId, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export function getAllFrames() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/frames', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function addNewFrame(frame) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/frames', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frame),
    })
}

export function updateFrameById(frameId, frame) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/frames/' + frameId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(frame),
    })
}

export function deleteFrameById(frameId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/frames/' + frameId, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}
//{
//         "id": 1,
//         "url": "/images/slideshow/1.jpg",
//         "productId": 39
//     },
export function getAllSlideshow() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/slideshow', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function getProductBySlideshow(productId) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/slideshow/' + productId, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function updateSlideshowById(id, slideshow) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/slideshow/' + id, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slideshow)
    })
}

export function deleteSlideshowById(id) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/slideshow/' + id, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function addNewSlideshow(slideshow) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/slideshow', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slideshow),
    })
}
