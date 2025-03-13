"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Please enter your email.' })
        .min(1, 'Please enter your email.')
        .email('The email address is badly formatted.'),
    password: zod_1.z
        .string({ required_error: 'Please enter your password.' })
        .min(6, 'Your password must have 6 characters or more.'),
});
exports.UpdateUserSchema = exports.CreateUserSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
});
