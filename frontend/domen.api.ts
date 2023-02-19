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
const some = 'http://localhost:8000';
export const DOMEN = {
    product: {
        create:  some + '/product/create',
        getAll: some +'/product/',
        getByName: some + '/product/info:',
        deleteProduct: some +   '/product/delete',
        update: some +  '/product/update',
        getByCategory:some +   '/product/byCategory',
        getCategory: some + '/product/getCategory',
        getById:  some + 'http://localhost:8000/product/getProductById:',
        getFirstCategory:  some + '/product/getFirstCategory'
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