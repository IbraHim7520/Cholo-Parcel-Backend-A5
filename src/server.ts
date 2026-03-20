import { Server } from "http";
import app from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const port = env.PORT || 8000;

let server: Server;

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}

async function startServer() {
    try {
        await connectDB();

        server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();

process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);

    if (server) {
        server.close(() => {
            console.log("🛑 Server closed due to unhandled rejection");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});



process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    process.exit(1);
});


// ❗ Graceful Shutdown (important for production যেমন Vercel, Docker, etc.)
process.on("SIGTERM", () => {
    console.log("🛑 SIGTERM received. Shutting down...");

    if (server) {
        server.close(() => {
            console.log("💀 Server closed gracefully");
        });
    }
});