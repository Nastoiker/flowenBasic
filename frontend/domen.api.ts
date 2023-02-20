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
        getById:  api_url + 'http://localhost:8000/product/getProductById:',
        getFirstCategory:  api_url + '/product/getFirstCategory'
    },
    user: {
        find: '/user/profile:',
        login:  '/user/login',
        register:'/user/register',
    },
    comment: {
        createComment: '/'
    }
};