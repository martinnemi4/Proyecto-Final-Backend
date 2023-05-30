import productDAO from "./mongoDB/productDAO.js";
import cartDAO from "./mongoDB/cartDAO.js";
import userDAO from "./mongoDB/userDAO.js";
import ticketDAO from "./mongoDB/ticketDAO.js";
import historyDAO from "./mongoDB/historyDAO.js";
import keyDAO from "./mongoDB/keyDAO.js";

export const productService = new productDAO();
export const cartService = new cartDAO();
export const userService = new userDAO();
export const ticketService = new ticketDAO();
export const historyService = new historyDAO();
export const keyService = new keyDAO();