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

export function doRegister(email, password, preferredLanguage) {
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
                password: password,
                preferredLanguage: preferredLanguage.toUpperCase()
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

export function deleteUser(email, password) {
    return fetch(process.env.REACT_APP_API_URL + '/user/delete', {
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

export function setPreferredLanguage(language) {
    return fetch(process.env.REACT_APP_API_URL + '/preferred-language', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                preferredLanguage: language.toUpperCase(),
            }),

    })
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

export function getShippingAddresses() {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function updateShippingAddressById(newShippingAddress, id) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + id + '/', {
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
                countryId: newShippingAddress.country.id,
                phoneNumber: newShippingAddress.phoneNumber,
                ico: newShippingAddress.ico,
                dic: newShippingAddress.dic
            }),
    })
        .then(response => response.json())
}

export function saveNewShippingAddress(newShippingAddress) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/', {
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
                countryId: newShippingAddress.country.id,
                phoneNumber: newShippingAddress.phoneNumber,
                ico: newShippingAddress.ico,
                dic: newShippingAddress.dic
            }),
    })
        .then(response => response.json())
}

export function deleteShippingAddressById(id) {
    return fetch(process.env.REACT_APP_API_URL + '/ship-address/' + id + '/', {
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
        return fetch(process.env.REACT_APP_API_URL + '/secret/admin/products?from=' + page + '&to=' + limit, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
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
        body: JSON.stringify(colour),
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



export function getNotShippedOrPayedOrders() {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/not-pay-not-shipped', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function updateNotShippedOrPayedOrderById(orderId, booleanObject) {
    return fetch(process.env.REACT_APP_API_URL + '/secret/admin/not-pay-not-shipped/' + orderId, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booleanObject),
    })
}


export function updateShoppingCart(shoppingCart) {
    return fetch(process.env.REACT_APP_API_URL + '/cart', {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingCart),
    })
        .then(response => response.json())

}

export function updateGuestShoppingCart(cartAndAddress) {
    return fetch(process.env.REACT_APP_API_URL + '/cart/guest', {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartAndAddress),
    })
        .then(response => response.json())

}

export function getShoppingCartContent() {
    return fetch(process.env.REACT_APP_API_URL + '/cart', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())

}

export function setAddressesForShoppingCart(shippingAddressId, billingAddressId) {
    return fetch(process.env.REACT_APP_API_URL + '/cart/address', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingAddress: shippingAddressId.toString(),
            billingAddress: billingAddressId.toString()
        }),
    })
        .then(response => response.json())
}


export function getAllPaymentMethods() {
    return fetch(process.env.REACT_APP_API_URL + '/payment-methods', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function getAllShippingMethods() {
    return fetch(process.env.REACT_APP_API_URL + '/shipping-methods', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function getAllShippingMethodsByCartIdForGuest(cartId) {
    console.log(cartId);
    return fetch(process.env.REACT_APP_API_URL + '/shipping-methods/' + cartId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function getAllCountries() {
    return fetch(process.env.REACT_APP_API_URL + '/countries', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
}

export function setShippingAndPaymentMethodsCart(shippingMethodId, paymentMethodId) {
    return fetch(process.env.REACT_APP_API_URL + '/payment-and-shipping', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingMethodId: shippingMethodId.toString(),
            paymentMethodId: paymentMethodId.toString()
        }),
    })
        .then(response => response.json())
}

export function setShippingAndPaymentMethodsForGuestCart(cartId, shippingMethodId, paymentMethodId) {
    return fetch(process.env.REACT_APP_API_URL + '/payment-and-shipping/' + cartId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingMethodId: shippingMethodId.toString(),
            paymentMethodId: paymentMethodId.toString()
        }),
    })
        .then(response => response.json())
}

export function buyAsUser() {
    return fetch(process.env.REACT_APP_API_URL + '/buy', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export function buyAsGuest(cartId) {
    return fetch(process.env.REACT_APP_API_URL + '/buy/' + cartId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

