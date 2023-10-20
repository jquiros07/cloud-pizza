/**
 * Pack pizza lambda function handler. 
 * Part of the same pizza ordering simulation, returns a response with status.
 * 
 * @export
 * @param {any} body
 * @returns {Promise<any>}
 */
export const handler = async (body: any): Promise<any> => {
    try {
        return {
            'message': 'Packing pizza',
            'order': {
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