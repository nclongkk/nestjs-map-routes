"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkRoute = exports.MARK_ROUTE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.MARK_ROUTE_KEY = 'mark_route_key';
const MarkRoute = () => (0, common_1.SetMetadata)(exports.MARK_ROUTE_KEY, exports.MARK_ROUTE_KEY);
exports.MarkRoute = MarkRoute;
//# sourceMappingURL=mark-route.decorator.js.map