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

export const userChangePasswordZodSchema = z.object({
    oldPassword: z.string("Old password is required").min(6, "Old password must be at least 6 characters long").max(8, "Old password must be at most 8 characters long"),
    newPassword: z.string("New password is required").min(6, "New password must be at least 6 characters long").max(8, "New password must be at most 8 characters long"),
})

export const userCreateReviews = z.object({
    rating: z.number("Rating is required").min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    comment: z.string("Comment is required").min(1, "Comment must be at least 1 character long").max(200 ,"Comment must be at most 200 characters long"),
    userId: z.string("User ID is required"),
    percelId: z.string("Percel ID is required")
})