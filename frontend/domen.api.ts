// export const DOMEN = {
//     product: {
//         create: process.env.DOMEN + '/product/create',
//         getAll: process.env.DOMEN + '/product/',
//         getByName: process.env.DOMEN + '/product/info:',
//         deleteProduct: process.env.DOMEN + '/product/delete',
//         update: process.env.DOMEN + '/product/update',
//         getByCategory: process.env.DOMEN + '/product/byCategory',
//         getCategory: process.env.DOMEN + '/product/getCategory',
//         getById: process.env.DOMEN + 'http://localhost:8000/product/getProductById:',
//         getFirstCategory: process.env.DOMEN + '/product/getFirstCategory'
//     },
//     user: {
//         find: process.env.DOMEN + '/user/profile:',
//         login: process.env.DOMEN + '/user/login',
//         register: process.env.DOMEN + '/user/register',
//     }
// };
export const api_url = 'http://localhost:8000';
export const DOMEN = {
    product: {
        create:  api_url + '/product/create',
        getAll: api_url +'/product/',
        getByName: api_url + '/product/info:',
        deleteProduct: api_url +   '/product/delete',
        update: api_url +  '/product/update',
        getByCategory:api_url +   '/product/byCategory',
        getCategory: api_url + '/product/getCategory',
        getById:  api_url + '/product/getProductById:',
        getFirstCategory:  api_url + '/product/getFirstCategory'
    },
    brand: {
      getBrands: api_url + '/product/getBrands'
    },
    user: {
        find: api_url + '/users/profile:',
        login:  api_url + '/users/login',
        register: api_url + '/users/register',
        getInfoAfterAuth: api_url + '/users/authorAuthorization',
        createAddress: api_url + '/users/createAddress',
        editAddress: api_url + '/users/editAddress',
        editProfile: api_url + '/users/editProfileInfo',
        updateAvatar: api_url + '/users/updateAvatar',
    },
    comment: {
        createComment: api_url + '/product/comment',
    },
    basket: {
        editCount: api_url + '/product/editQuantityBasketProduct',
        getBasket: api_url + '/product/getBasket',
        addBasket: api_url + '/product/addBasket',
        deleteBasket: api_url + '/product/deleteBasket',
    },
    rating: {
        setRating: api_url + '/product/setRating',
    },
    admin: {
        createProduct: api_url + '/product/create',
        createModel: api_url + '/product/createModel',
        createCategory: api_url + '/product/setBrandOnSecondCategory',
        createBrand: api_url + '/product/setCategoryOnBrand',
        deleteProduct: api_url + '/delete',
        updatePictureProduct: api_url + '/product/uploadImage',
    }
};