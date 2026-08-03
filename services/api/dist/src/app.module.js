"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const properties_module_1 = require("./properties/properties.module");
const brokers_module_1 = require("./brokers/brokers.module");
const users_module_1 = require("./users/users.module");
const admin_module_1 = require("./admin/admin.module");
const cities_module_1 = require("./cities/cities.module");
const visits_module_1 = require("./visits/visits.module");
const favorites_module_1 = require("./favorites/favorites.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            properties_module_1.PropertiesModule,
            brokers_module_1.BrokersModule,
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
            cities_module_1.CitiesModule,
            visits_module_1.VisitsModule,
            favorites_module_1.FavoritesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map