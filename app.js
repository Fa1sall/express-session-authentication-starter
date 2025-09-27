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

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

app.use(routes);

/**
 * -------------- SERVER ----------------
 */

app.listen(3000);
