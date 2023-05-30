import { cartService, userService, historyService, ticketService } from "../dao/index.js";
import config from "../config/config.js";
import { makeId } from "../utils.js";
import { DateTime } from "luxon";
import {transporter} from "../services/nodemailer.js";

const insertProductToCart = async(req,res) =>{
    const user = req.user;
    const productId = req.params.pro;
    const cart = await cartService.getCartById(user.cart);
    const exists = cart.products.find(product=>product._id.toString()===productId);
    if(exists) {
        cart.products[exists] = {
            ...exists,
            quantify: exists.quantify++
        };
        await cartService.updateCart(cart._id, {products:cart.products});
        res.redirect('/cart');
    } else {
        cart.products.push({_id: productId});
        await cartService.updateCart(cart._id, {products:cart.products});
        console.log(cart.products);
        res.redirect('/cart');
    }
};

const purchase = async(req,res) => {
    const user = req.user;
    const cart = await cartService.getCartById(user.cart ,{populate:true});
    const populatedCart = await cartService.getCartById(user.cart);
    const total = cart.products.reduce(
        (acum, product) => acum + product._id.price * product.quantify, 0
    )
    const ticket = {
        user: user._id,
        products: populatedCart.products,
        total: total,
        code: makeId(20)
    }
    await cartService.updateCart(cart._id,{products:[]});
    await ticketService.createTicket(ticket);
    const history = await historyService.getHistoryBy({user: user._id});
    const event = {
        event: 'Purchase',
        date: DateTime.now().toISO(),
        description: `You have made a purchase of ${populatedCart.products.length>1? "multiple products": "one product"}.`
    };
    if(!history) {
        await historyService.createHistory({user: user._id, events:[event]})
    }else{
        history.events.push(event);
        await historyService.updateHistory(history._id, {events:history.events})
    }
    let order = '';
    for(const product of cart.products){
        order += `<div> <h2>${product._id.title}</h2> <h4>Precio: $ ${product._id.price}</h4> <h4>Cantidad: ${product.quantify}</h4> </div>` 
    };
    const orderResult = await transporter.sendMail({
        from: `AromasByCande <martinnemi4@gmail.com>`,
        to: ['Lazarodt12', user.email],
        subject: `Orden de compra de ${user.firstName} ${user.lastName}`,
        html: `
        <div>
            <h1>Order: </h1>
            <p>Code: <strong> ${ticket.code} </strong></p>
            <hr>
            <div>
                ${order}
            </div>
            <hr>
            <h3> Total: $${total} </h3>
        </div>
        `,
    })
    res.redirect('/finishedPurchase')
};

export default {
    insertProductToCart,
    purchase
}