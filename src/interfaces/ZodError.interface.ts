//     {
//         "origin": "string",
//         "code": "too_big",
//         "maximum": 8,
//         "inclusive": true,
//         "path": [
//             "riderSignupData",
//             "password"
//         ],
//         "message": "Password must be at most 8 characters long"
//     },

export interface IZodError {
    origin: string;
    code: string;
    maximum: number;
    inclusive: boolean;
    path: string[];
    message: string;
}