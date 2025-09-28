import bcrypt from "bcrypt";

// TODO
async function genPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export { validatePassword, genPassword };
