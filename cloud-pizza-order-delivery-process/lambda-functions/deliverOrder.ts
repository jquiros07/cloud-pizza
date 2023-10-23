import { OrderProcess } from "../types/order";

/**
 * Deliver pizza lambda function handler. Pizza order ready to deliver, 
 * generates an order identifier and returns a response with status.
 * 
 * @export
 * @param {OrderProcess} orderProcess
 * @returns {Promise<OrderProcess>}
 */
export const handler = async (orderProcess: OrderProcess): Promise<OrderProcess> => {
    try {
        //Update order process flow control object
        orderProcess.orderSent = true;
        orderProcess.message = 'Sending order!';
        
        return orderProcess;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}