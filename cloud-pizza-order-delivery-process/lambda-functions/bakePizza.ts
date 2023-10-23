import { OrderProcess } from "../types/order";

/**
 * Bake pizza lambda function handler. 
 * Pizza baking simulation and returns response with status.
 * 
 * @export
 * @param {OrderProcess} orderProcess
 * @returns {Promise<OrderProcess>}
 */
export const handler = async (orderProcess: OrderProcess): Promise<OrderProcess> => {
    try {
        //Update order process flow control object
        orderProcess.pizzaBaked = true;
        return orderProcess;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}