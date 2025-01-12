import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import dotenv from "dotenv/config";
import expressLayouts from "express-ejs-layouts";
import CONFIG from "./config/index.js";
import flash from "connect-flash";
import helmet from "helmet";

// Import routes
import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";
import errorRoute from "./routes/error.js";

const app = express();
const PORT = 3000;
const host = "0.0.0.0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Set up session middleware
app.use(
  session({
    secret: CONFIG.SESSION_SECREAT,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(flash());

app.use("/", authRouter);
app.use("/dashboard", dashboardRouter);

// error handler
app.use("*", errorRoute);

app.use((req, res, next) => {
  res.locals.error = req.flash("error") || [];
  res.locals.success = req.flash("success") || [];
  next();
});

app.listen(PORT, host, () => {
  console.log(`Server is running on port ${PORT}`);
});
