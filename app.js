import express from "express";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import routes from "./routes/index.js";
import pool from "./config/database.js";
import connectPgSimple from "connect-pg-simple";
import "./config/passport.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day validity
    },
  })
);

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

app.use(routes);

/**
 * -------------- SERVER ----------------
 */

app.listen(3000, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Express app running at http://localhost:3000`);
});
