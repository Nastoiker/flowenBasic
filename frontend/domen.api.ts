export const DOMEN = {
    product: {
        create: process.env.DOMEN + '/product/create',
        getAll: process.env.DOMEN + '/product/',
        getByName: process.env.DOMEN + '/product/info:',
        deleteProduct: process.env.DOMEN + '/product/delete',
        update: process.env.DOMEN + '/product/update',
        getByCategory: process.env.DOMEN + '/product/byCategory',
        getCategory: process.env.DOMEN + '/product/getCategory',
        getById: process.env.DOMEN + 'http://localhost:8000/product/getProductById:'
    },
    user: {
        find: process.env.DOMEN + '/user/profile:',
        login: process.env.DOMEN + '/user/login',
        register: process.env.DOMEN + '/user/register',
    }
};