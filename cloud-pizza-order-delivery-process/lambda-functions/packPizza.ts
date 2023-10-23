import { OrderProcess } from "../types/order";

/**
 * Pack pizza lambda function handler. 
 * Part of the same pizza ordering simulation, returns a response with status.
 * 
 * @export
 * @param {OrderProcess} orderProcess
 * @returns {Promise<OrderProcess>}
 */
export const handler = async (orderProcess: OrderProcess): Promise<OrderProcess> => {
    try {
        //Update order process flow control object
        orderProcess.pizzaPacked = true;
        return orderProcess;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}