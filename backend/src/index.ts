import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import portfolioRoutes from "./routes/portfolio";
import contactRoutes from "./routes/contact";
import testimonialRoutes from "./routes/testimonial";
import type { Env } from "./types/env";

const app = new Hono<{ Bindings: Env }>();

// CORS Middleware
app.use("*", (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.CORS_ORIGIN || "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  return corsMiddleware(c, next);
});

// Health check
app.get("/", (c) => {
  return c.json({ success: true, data: null, message: "Portfolio API is running" });
});

// Routes
app.route("/api/auth", auth);
app.route("/api/portfolio", portfolioRoutes);
app.route("/api/contact", contactRoutes);
app.route("/api/testimonial", testimonialRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ success: false, data: null, message: "Endpoint tidak ditemukan" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ success: false, data: null, message: "Terjadi kesalahan server" }, 500);
});

export default app;
