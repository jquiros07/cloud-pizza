import { OrderProcess, OrderRequest } from "../types/order";

/**
 * Receive order lambda function handler. 
 * Receives the order request, check if the customer ask for pineapple as ingredient and evaluates.
 * 
 * @export
 * @param {OrderRequest} orderRequest
 * @returns {Promise<OrderRequest>}
 */
export const handler = async (orderRequest: OrderRequest): Promise<OrderRequest> => {    
    try {
        let pineapple: string = orderRequest.pizza.pineapple;
        let askingForPineapple: boolean = (pineapple.toLowerCase().trim() == 'yes') ? true : false;

        orderRequest.orderReceived = true;
        orderRequest.requestingPineappleAsIngredient = askingForPineapple;

        return orderRequest;
    } catch (error) {
        console.log(error);
        throw new Error(); 
    }
}

