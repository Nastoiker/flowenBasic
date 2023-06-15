"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CryptomusService = void 0;
const config_service_1 = require("../config/config.service");
const inversify_1 = require("inversify");
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const crypto_1 = __importDefault(require("crypto"));
let CryptomusService = class CryptomusService {
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('CRYPTO_API_KEY');
        this.merchantId = this.configService.get('CRYPTO_MERCHANT_KEY');
    }
    checkPayment(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    uuid,
                };
                const { data } = yield axios_1.default.post('https://api.cryptomus.com/v1/payment/info', payload, {
                    headers: this.getHeader(JSON.stringify(payload)),
                });
                return data;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createPayment(amount, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    amount: amount.toString(),
                    currency: 'USD',
                    order_id: orderId,
                };
                const { data } = yield axios_1.default.post('https://api.cryptomus.com/v1/payment', payload, {
                    headers: this.getHeader(JSON.stringify(payload)),
                });
                console.log(data);
                return data;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getHeader(payload) {
        const sign = crypto_1.default
            .createHash('md5')
            .update(Buffer.from(payload).toString('base64') + this.apiKey)
            .digest('hex');
        return {
            merchant: this.merchantId,
            sign,
        };
    }
};
CryptomusService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], CryptomusService);
exports.CryptomusService = CryptomusService;
//# sourceMappingURL=cryptomus.service.js.map