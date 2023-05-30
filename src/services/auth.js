import bcrypt from "bcryptjs";

export const createHash = async(password) => {
    const salts = await bcrypt.genSalt(6);
    return bcrypt.hash(password,salts);
};

export const validatePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}