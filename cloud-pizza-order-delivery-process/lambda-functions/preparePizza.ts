import { PizzaBuilder } from '../builders/pizzaBuilder';

/**
 * Prepare pizza lambda function handler. 
 * Creates pizza according order parameters.
 * 
 * @export
 * @param {any} body
 * @returns {Promise<any>}
 */
export const handler = async (body: any): Promise<any> => {
    try {
        let size: string = body.order.pizza.size;

        let pizza = new PizzaBuilder(size);

        let withPepperoni: string = body.order.pizza.pepperoni.toLowerCase().trim();
        let withBacon: string = body.order.pizza.bacon.toLowerCase().trim();
        let withMushrooms: string = body.order.pizza.mushrooms.toLowerCase().trim();
        let withMeat: string = body.order.pizza.meat.toLowerCase().trim();

        if(withPepperoni == 'yes') {
            pizza.addPepperoni();
        }
        if(withBacon == 'yes') {
            pizza.addBacon();
        }
        if(withMushrooms == 'yes') {
            pizza.addMushrooms();
        }
        if(withMeat == 'yes') {
            pizza.addMeat();
        }

        pizza.build();

        return {
            'message': 'Preparing pizza',
            'order': {
                'orderName' : body.order.orderName,
                'deliveryAddress': body.order.deliveryAddress,
                'pizza' : pizza
            },
        };
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}