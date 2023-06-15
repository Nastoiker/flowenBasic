"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const supertest_1 = __importDefault(require("supertest"));
let Application;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const { app } = yield main_1.boot;
    Application = app;
}));
describe('User-e2e', () => {
    it('Register-error', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(Application.app)
            .post('/users/register')
            .send({ email: 'damur@gmail.com', password: '1' });
        expect(res.statusCode).toBe(422);
    }));
    it('Login-error', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(Application.app)
            .post('/users/login')
            .send({ email: 'damur@gmail.com', password: '1' });
        expect(res.statusCode).toBe(401);
    }));
    it('Login-succes', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(Application.app)
            .post('/users/login')
            .send({ email: 'samat@gmail.com', password: 'daun' });
        expect(res.body.jwt).not.toBeUndefined();
    }));
    it('Info-succes', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(Application.app)
            .post('/users/login')
            .send({ email: 'samat@gmail.com', password: 'daun' });
        const jwtToken = yield (0, supertest_1.default)(Application.app)
            .get('/users/info')
            .set('Authorization', `Bearer ${login.body.jwt}`);
        expect(jwtToken.body.email).toBe('samat@gmail.com');
    }));
});
//# sourceMappingURL=user.e2e-spec.js.map