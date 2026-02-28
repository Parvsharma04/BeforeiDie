"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var ListsController = function () {
    var _classDecorators = [(0, common_1.Controller)('lists'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _findOne_decorators;
    var _create_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _addItem_decorators;
    var _updateItem_decorators;
    var _removeItem_decorators;
    var ListsController = _classThis = /** @class */ (function () {
        function ListsController_1(listsService) {
            this.listsService = (__runInitializers(this, _instanceExtraInitializers), listsService);
        }
        ListsController_1.prototype.findAll = function (user) {
            return this.listsService.findAll(user.userId);
        };
        ListsController_1.prototype.findOne = function (id, user) {
            return this.listsService.findOne(id, user.userId);
        };
        ListsController_1.prototype.create = function (dto, user) {
            return this.listsService.create(dto, user.userId);
        };
        ListsController_1.prototype.update = function (id, dto, user) {
            return this.listsService.update(id, dto, user.userId);
        };
        ListsController_1.prototype.remove = function (id, user) {
            return this.listsService.remove(id, user.userId);
        };
        // --- Items ---
        ListsController_1.prototype.addItem = function (id, dto, user) {
            return this.listsService.addItem(id, dto, user.userId);
        };
        ListsController_1.prototype.updateItem = function (id, itemId, dto, user) {
            return this.listsService.updateItem(id, itemId, dto, user.userId);
        };
        ListsController_1.prototype.removeItem = function (id, itemId, user) {
            return this.listsService.removeItem(id, itemId, user.userId);
        };
        return ListsController_1;
    }());
    __setFunctionName(_classThis, "ListsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, common_1.Get)()];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _create_decorators = [(0, common_1.Post)()];
        _update_decorators = [(0, common_1.Patch)(':id')];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(204)];
        _addItem_decorators = [(0, common_1.Post)(':id/items')];
        _updateItem_decorators = [(0, common_1.Patch)(':id/items/:itemId')];
        _removeItem_decorators = [(0, common_1.Delete)(':id/items/:itemId'), (0, common_1.HttpCode)(204)];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addItem_decorators, { kind: "method", name: "addItem", static: false, private: false, access: { has: function (obj) { return "addItem" in obj; }, get: function (obj) { return obj.addItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateItem_decorators, { kind: "method", name: "updateItem", static: false, private: false, access: { has: function (obj) { return "updateItem" in obj; }, get: function (obj) { return obj.updateItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeItem_decorators, { kind: "method", name: "removeItem", static: false, private: false, access: { has: function (obj) { return "removeItem" in obj; }, get: function (obj) { return obj.removeItem; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListsController = _classThis;
}();
exports.ListsController = ListsController;
