import { faker } from "@faker-js/faker";

/**
 * Deliver pizza lambda function handler. Pizza order ready to deliver, 
 * generates an order identifier and returns a response with status.
 * 
 * @export
 * @param {any} body
 * @returns {Promise<any>}
 */
export const handler = async (body: any) => {
    try {
        return {
            'message': 'Sending order',
            'order': {
                'orderIdentifier': `ORD${faker.string.uuid()}`,
                'orderName' : body.order.orderName,
                'deliveryAddress': body.order.deliveryAddress,
                'pizza' : body.order.pizza
            }
        };
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}