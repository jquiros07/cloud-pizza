import { faker } from '@faker-js/faker';
import { Pizza } from '../builders/pizza';
import { PizzaBuilder } from '../builders/pizzaBuilder';
import { OrderProcess, OrderRequest } from '../types/order';

/**
 * Prepare pizza lambda function handler. 
 * Creates pizza according to order parameters.
 * 
 * @export
 * @param {OrderRequest} orderRequest
 * @returns {Promise<OrderProcess>}
 */
export const handler = async (orderRequest: OrderRequest): Promise<OrderProcess> => {
    try {
        let size: string = orderRequest.pizza.size;

        let pizza = new PizzaBuilder(size);

        let withPepperoni: string = orderRequest.pizza.pepperoni.toLowerCase().trim();
        let withBacon: string = orderRequest.pizza.bacon.toLowerCase().trim();
        let withMushrooms: string = orderRequest.pizza.mushrooms.toLowerCase().trim();
        let withMeat: string = orderRequest.pizza.meat.toLowerCase().trim();

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

        //Prepare pizza
        let pizzaProduct: Pizza = pizza.build();

        //Set order process flow control object, identifier generated
        let orderProcess: OrderProcess = {
            orderIdentifier: `ORD${faker.string.uuid()}`,
            order: orderRequest,
            pizzaPrepared: true,
            pizzaProductToDeliver: pizzaProduct
        };

        return orderProcess
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}