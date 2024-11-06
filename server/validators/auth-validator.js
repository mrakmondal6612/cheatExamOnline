const { z } = require('zod')

// Creating an Object schema 
const signupSchema = z.object({
    username: z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3, {message: 'Name must be at least 3 characters'})
    .max(255, {message: 'Name must not be more than 255 characters'}),
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Email is not valid'})
    .min(3, {message: 'Email must be at least 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),
    phone: z
    .string({required_error: 'phone is required'})
    .trim()
    .min(10, {message: 'phone must be at least 10 characters'})
    .max(20, {message: 'phone must not be more than 20 characters'}),
    password: z
    .string({required_error: 'Password is required'})
    .trim()
    .min(8, {message: 'Password must be at least 8 characters'})
    .max(255, {message: 'Password must not be more than 255 characters'}),
})

const loginSchema = z.object({
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Email is not valid'})
    .min(3, {message: 'Email must be at least 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),
    password: z
    .string({required_error: 'Password is required'})
    .trim()
    .min(8, {message: 'Password must be at least 8 characters'})
    .max(255, {message: 'Password must not be more than 255 characters'}),
})

const contactSchema = z.object({
    username: z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3, {message: 'Name must be at least 3 characters'})
    .max(255, {message: 'Name must not be more than 255 characters'}),
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({message: 'Email is not valid'})
    .min(3, {message: 'Email must be at least 3 characters'})
    .max(255, {message: 'Email must not be more than 255 characters'}),
    message: z
    .string({required_error: 'message is required'})
    .trim()
    .min(10, {message: 'message must be at least 10 characters'})
    .max(500, {message: 'message must not be more than 500 characters'}),
})

module.exports = {signupSchema, loginSchema, contactSchema};