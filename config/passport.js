import passport from "passport";
import passportlocal from "passport-local";
import { validatePassword } from "../lib/passwordUtils.js";
import pool from "./database.js";

// TODO: passport.use();

//Setup Local Strategy
const LocalStrategy = passportlocal.Strategy;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Fetch the user from the database
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "User not found!" });
      }

      // Check if password matches hashed password
      const match = await validatePassword(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password!" });
      }

      // If login is successful pass the user object => {username, password}
      return done(null, user);
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
