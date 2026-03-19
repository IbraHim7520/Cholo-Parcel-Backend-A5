import z, { email } from 'zod'
export const userSignupSchema = z.object({
    name: z.string("Name is required").min(3, "Name must be at least 3 characters long").max(20, "Name must be at most 20 characters long"),
    email: z.string("Email is required").email("Invalid email address"),
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(8, "Password must be at most 8 characters long"),
    image: z.string().optional()
    
})


export const userLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(8, "Password must be at most 8 characters long"),
    
})

