/**
 * Bake pizza lambda function handler. 
 * Pizza baking simulation and returns response with status.
 * 
 * @export
 * @param {any} body
 * @returns {Promise<any>}
 */
export const handler = async (body: any): Promise<any> => {
    try {
        return {
            'message': 'Baking pizza',
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