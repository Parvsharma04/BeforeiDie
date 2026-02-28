"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateItemDto = exports.CreateItemDto = exports.UpdateListDto = exports.CreateListDto = void 0;
var class_validator_1 = require("class-validator");
var CreateListDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _emoji_decorators;
    var _emoji_initializers = [];
    var _emoji_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateListDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.emoji = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _emoji_initializers, void 0));
                this.category = (__runInitializers(this, _emoji_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.visibility = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
                __runInitializers(this, _visibility_extraInitializers);
            }
            return CreateListDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1)];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _emoji_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _visibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['private', 'friends', 'public'])];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _emoji_decorators, { kind: "field", name: "emoji", static: false, private: false, access: { has: function (obj) { return "emoji" in obj; }, get: function (obj) { return obj.emoji; }, set: function (obj, value) { obj.emoji = value; } }, metadata: _metadata }, _emoji_initializers, _emoji_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateListDto = CreateListDto;
var UpdateListDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _emoji_decorators;
    var _emoji_initializers = [];
    var _emoji_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateListDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.emoji = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _emoji_initializers, void 0));
                this.category = (__runInitializers(this, _emoji_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.visibility = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
                __runInitializers(this, _visibility_extraInitializers);
            }
            return UpdateListDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1)];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _emoji_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _visibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['private', 'friends', 'public'])];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _emoji_decorators, { kind: "field", name: "emoji", static: false, private: false, access: { has: function (obj) { return "emoji" in obj; }, get: function (obj) { return obj.emoji; }, set: function (obj, value) { obj.emoji = value; } }, metadata: _metadata }, _emoji_initializers, _emoji_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateListDto = UpdateListDto;
var CreateItemDto = function () {
    var _a;
    var _text_decorators;
    var _text_initializers = [];
    var _text_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateItemDto() {
                this.text = __runInitializers(this, _text_initializers, void 0);
                this.priority = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                __runInitializers(this, _priority_extraInitializers);
            }
            return CreateItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1)];
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['low', 'medium', 'high'])];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: function (obj) { return "text" in obj; }, get: function (obj) { return obj.text; }, set: function (obj, value) { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateItemDto = CreateItemDto;
var UpdateItemDto = function () {
    var _a;
    var _text_decorators;
    var _text_initializers = [];
    var _text_extraInitializers = [];
    var _completed_decorators;
    var _completed_initializers = [];
    var _completed_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _photo_decorators;
    var _photo_initializers = [];
    var _photo_extraInitializers = [];
    var _reflection_decorators;
    var _reflection_initializers = [];
    var _reflection_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateItemDto() {
                this.text = __runInitializers(this, _text_initializers, void 0);
                this.completed = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _completed_initializers, void 0));
                this.priority = (__runInitializers(this, _completed_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.notes = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                this.photo = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _photo_initializers, void 0));
                this.reflection = (__runInitializers(this, _photo_extraInitializers), __runInitializers(this, _reflection_initializers, void 0));
                __runInitializers(this, _reflection_extraInitializers);
            }
            return UpdateItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1)];
            _completed_decorators = [(0, class_validator_1.IsOptional)()];
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['low', 'medium', 'high'])];
            _notes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _photo_decorators = [(0, class_validator_1.IsOptional)()];
            _reflection_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: function (obj) { return "text" in obj; }, get: function (obj) { return obj.text; }, set: function (obj, value) { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _completed_decorators, { kind: "field", name: "completed", static: false, private: false, access: { has: function (obj) { return "completed" in obj; }, get: function (obj) { return obj.completed; }, set: function (obj, value) { obj.completed = value; } }, metadata: _metadata }, _completed_initializers, _completed_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _photo_decorators, { kind: "field", name: "photo", static: false, private: false, access: { has: function (obj) { return "photo" in obj; }, get: function (obj) { return obj.photo; }, set: function (obj, value) { obj.photo = value; } }, metadata: _metadata }, _photo_initializers, _photo_extraInitializers);
            __esDecorate(null, null, _reflection_decorators, { kind: "field", name: "reflection", static: false, private: false, access: { has: function (obj) { return "reflection" in obj; }, get: function (obj) { return obj.reflection; }, set: function (obj, value) { obj.reflection = value; } }, metadata: _metadata }, _reflection_initializers, _reflection_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateItemDto = UpdateItemDto;
