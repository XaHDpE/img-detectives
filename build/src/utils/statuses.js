"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["Success"] = 200] = "Success";
    StatusEnum[StatusEnum["Created"] = 201] = "Created";
    StatusEnum[StatusEnum["BadRequest"] = 400] = "BadRequest";
    StatusEnum[StatusEnum["ServerError"] = 500] = "ServerError";
    StatusEnum[StatusEnum["NotFound"] = 404] = "NotFound";
    StatusEnum[StatusEnum["Conflict"] = 409] = "Conflict";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
function handleStatusEnum(status) {
    // Access enum values using dot notation
    if (status === StatusEnum.Success) {
        // Handle success
    }
}
//# sourceMappingURL=statuses.js.map