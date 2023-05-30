import { cartService, productService, historyService } from "../dao/index.js";

const products = async(req, res) => {
    const page = req.query.page||1;
    const pagination = await productService.getProducts({}, page);
    let products = pagination.docs;
    console.log(pagination)
    const paginationData = {
        hasPrevPage: pagination.hasPrevPage,
        hasNextPage: pagination.hasNextPage,
        nextPage: pagination.nextPage,
        prePage: pagination.prePage,
        page: pagination.page
    }
    res.render('products', {
        products, 
        paginationData, 
        user: req.user, 
        title: "Products - Aromas By Cande",
        css: 'products'
    })
};

const register = (req, res) => {
    res.render('register', {
        title: "Register - Aromas By Cande",
        css: 'register'
    })
};

const login = (req, res) => {
    res.render('login', {
        title: "Log In - Aromas By Cande",
        css: '../public/css/login.css'
    })
};

const profile = async (req, res) => {
    const history = await historyService.getHistoryBy({
        user:req.user._id
    })
    res.render('profile',{
        user: req.user, 
        events: history ? history.events:[], 
        title: "Profile - Aromas By Cande",
        css: 'profile'
    })
};

const failLogin = (req, res) => {
    res.render('loginFail')
};

const home = (req, res) => {
    res.render('home', {
        user: req.user, 
        title: "Home - Aromas By Cande", css: 'home'
    })
};

const contact = (req, res) => {
    res.render('contact', {
        user: req.user, 
        title: "Contact - Aromas By Cande",
        css: 'contact'
    })
};

const cart = async(req,res) => {
    const cartId = req.user.cart
    const cart = await cartService.getCartById(cartId, {populate:true});
    console.log(cart.products);
    const products = cart.products.map((product) => ({
        ...product._id,
        quantify: product.quantify
    }));
    const totalPrice = products.reduce((acum, product) => acum + product.price * product.quantify, 0)
    res.render('cart', {
        products,
        user: req.user,
        totalPrice,
        title: "Cart - Aromas By Cande",
        css: 'cart'
    })
};

const finishPurchase = async(req,res) =>{
    res.render('payMethod', {
        user:req.user, 
        title: "Pay Method - Aromas By Cande", 
        css: 'cart'
    })
}

const finishedPurchase = async (req, res) => {
    //const user = await userService.getUserBy({_id:req.user.id})
    res.render('finishedPurchase', { 
        user: req.user , 
        title: "Finished Purchase - Aromas By Cande", 
        css: 'purchase'
    });
};


const logout = async (req,res) => {
    res.clearCookie(process.env.JWT_COOKIE)
    res.render('logout', {
        user: req.user, 
        title: "Log out - Aromas By Cande",
        css: 'logout'
    })
}

export default {
    home,
    products,
    contact,
    register,
    login,
    profile,
    failLogin,
    cart,
    finishPurchase,
    finishedPurchase,
    logout
}