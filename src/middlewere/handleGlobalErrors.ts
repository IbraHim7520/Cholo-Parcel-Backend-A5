import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { ZodError } from "zod";
import status from "http-status";
import { APIError } from "better-auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClientValidationError } from "../../generated/prisma/internal/prismaNamespace";

// Common Error Interface for Frontend Consistency
interface IErrorSource {
    path: string | number;
    message: string;
}

const GlobalError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";
    let errorSources: IErrorSource[] = [];

    if (env.NODE_ENV === "development") {
        console.error("Error Log -> ", err);
    }

    // 1. Zod Validation Error
    if (err instanceof ZodError) {
        statusCode = status.BAD_REQUEST;
        message = "Validation Error";

        errorSources = err.issues.map((issue) => ({
            path: String(issue.path[issue.path.length - 1] ?? ""),
            message: issue.message,
        }));
    }

    // 2. Prisma Known Request Errors
    else if (err instanceof PrismaClientKnownRequestError) {
        statusCode = status.BAD_REQUEST;

        // P2002: Unique constraint failed
        if (err.code === "P2002") {
            const field = (err.meta?.target as string[])?.join(", ") || "field";

            message = `Duplicate value error: ${field} already exists.`;

            errorSources = [
                {
                    path: field,
                    message: `${field} must be unique.`,
                },
            ];
        }

        // P2025: Record not found
        else if (err.code === "P2025") {
            message = "Record not found";

            errorSources = [
                {
                    path: "",
                    message:
                        (err.meta?.cause as string) ||
                        "The record you are looking for does not exist.",
                },
            ];
        }

        else {
            message = "Database Request Error";

            errorSources = [
                {
                    path: "",
                    message: err.message,
                },
            ];
        }
    }

    // 3. Prisma Validation Error
    else if (err instanceof PrismaClientValidationError) {
        statusCode = status.BAD_REQUEST;
        message = "Invalid data provided to the database.";

        errorSources = [
            {
                path: "",
                message:
                    "Check if you are sending the correct data types according to the schema.",
            },
        ];
    }

    // 4. Better Auth / API Errors
    else if (err instanceof APIError) {
        statusCode = err.statusCode || status.FORBIDDEN;
        message = err.body?.message || "Authentication Error";

        errorSources = [
            {
                path: err.body?.code || "AUTH_ERROR",
                message: err.message,
            },
        ];
    }

    // 5. Native Error Object
    else if (err instanceof Error) {
        message = err.message;

        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: env.NODE_ENV === "development" ? err?.stack : undefined,
    });
};

export default GlobalError;