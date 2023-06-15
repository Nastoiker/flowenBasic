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
exports.CronService = void 0;
const inversify_1 = require("inversify");
const cron_repository_1 = require("./cron.repository");
const types_1 = require("../types");
const cryptomus_service_1 = require("../cryptomus/cryptomus.service");
const node_cron_1 = __importDefault(require("node-cron"));
let CronService = class CronService {
    constructor(cronRepository, cryptomus) {
        this.cronRepository = cronRepository;
        this.cryptomus = cryptomus;
    }
    init() {
        console.log(1);
        node_cron_1.default.schedule('*/5 * * * * *', () => __awaiter(this, void 0, void 0, function* () {
            const payments = yield this.cronRepository.findMany();
            if (!payments) {
                return null;
            }
            for (const payment of payments) {
                const res = yield this.cryptomus.checkPayment(payment.uuid);
                if (!res) {
                    console.log('ошибка');
                    continue;
                }
                console.log(2);
                console.log(payment);
                if (res.result.is_final) {
                    console.log(res.result.status);
                }
                const { id } = yield this.cronRepository.update(payment.uuid, payment.finnalyPrice, payment.isFinal);
                yield this.cronRepository.updateBuyingStatusBakset(id);
            }
        }));
    }
};
CronService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CronRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CryptomusService)),
    __metadata("design:paramtypes", [cron_repository_1.CronRepository,
        cryptomus_service_1.CryptomusService])
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map