import { Pizza } from "../builders/pizza";

/**
 * Type alias used to define pizza input data.
 *
 * @typedef {PizzaRequest}
 */
type PizzaRequest = {
    readonly size: string,
    readonly pepperoni: string,
    readonly bacon: string,
    readonly mushrooms: string,
    readonly meat: string,
    readonly pineapple: string
};

/**
 * Type alias used to define order input data for processing.
 *
 * @export
 * @typedef {OrderRequest}
 */
export type OrderRequest = {
    readonly orderName: string,
    readonly deliveryAddress: string,
    readonly pizza: PizzaRequest,
    orderReceived?: boolean,
    requestingPineappleAsIngredient?: boolean
};

/**
 * Type alias used to define order ouput data for processing.
 *
 * @export
 * @typedef {OrderProcess}
 */
export type OrderProcess = {
    orderIdentifier: string,
    readonly order: OrderRequest,
    pizzaPrepared?: boolean,
    pizzaBaked?: boolean,
    pizzaPacked?: boolean,
    orderSent?: boolean,
    pizzaProductToDeliver?: Pizza,
    message?: string
};