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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.users();
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteCategory(id);
        });
    }
    deleteTagFromProduct(id, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteTagFromProduct(id);
        });
    }
    deleteSecondCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteSecondCategory(id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteUser(id);
        });
    }
    deleteModel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteModel(id);
        });
    }
    updateTagFromProduct(productId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.updateTagFromProduct(productId, tagId);
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.adminRepository.deleteComment(commentId);
        });
    }
};
AdminService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AdminRepository)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map