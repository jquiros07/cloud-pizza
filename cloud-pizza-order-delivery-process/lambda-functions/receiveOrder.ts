/**
 * Receive order lambda function handler. 
 * Check if the order ask for pineapple as ingredient and evaluates.
 * 
 * @export
 * @param {any} body
 * @returns {Promise<any>}
 */
export const handler = async (body: any): Promise<any> => {    
    try {
        let pineapple: string = body.pizza.pineapple.toString();
        let askingForPineapple:boolean = (pineapple.toLowerCase().trim() == 'yes') ? true : false;

        return {
            'message': 'Order received',
            'order': {
                'orderName' : body.orderName,
                'deliveryAddress': body.deliveryAddress,
                'pizza': body.pizza,
                'quantity': body.quantity
            },
            'requestingPineappleAsIngredient': askingForPineapple
        };
    } catch (error) {
        console.log(error);
        throw new Error(); 
    }
}

