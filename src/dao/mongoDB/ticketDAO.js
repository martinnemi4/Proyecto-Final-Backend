import ticketModel from './models/ticket.js';

export default class ticketDAO {
    getTickets = () => {
        return ticketModel.find().lean();
    };
    getTicketBy = (params) => {
        return ticketModel.findOne(params).lean();
    };
    createTicket = (ticket) => {
        return ticketModel.create(ticket);
    };
}