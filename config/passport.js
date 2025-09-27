import passport from "passport";
import { LocalStrategy } from "passport-local";
import pool from "./database.js";

// TODO: passport.use();

//Setup Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      const user = rows[0];

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);
