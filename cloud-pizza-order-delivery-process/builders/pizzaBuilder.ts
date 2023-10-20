import { Pizza } from "./pizza";

/**
 * PizzaBuilder class for builder design pattern.
 *
 * @export
 * @class PizzaBuilder
 * @typedef {PizzaBuilder}
 */
export class PizzaBuilder {
    /**
     * PizzaBuilder class property size
     *
     * @public
     * @type {string}
     */
    public size: string;
    /**
     * PizzaBuilder class property pepperoni
     *
     * @public
     * @type {boolean}
     */
    public pepperoni: boolean = false;
    /**
     * PizzaBuilder class property bacon
     *
     * @public
     * @type {boolean}
     */
    public bacon: boolean = false;
    /**
     * PizzaBuilder class property mushrooms
     *
     * @public
     * @type {boolean}
     */
    public mushrooms: boolean = false;
    /**
     * PizzaBuilder class property meat
     *
     * @public
     * @type {boolean}
     */
    public meat: boolean = false;
    /**
     * Creates an instance of PizzaBuilder.
     *
     * @constructor
     * @param {string} size
     */
    constructor(size: string) {
        this.size = size;
    }
    /**
     * Function to add pepperoni ingredient
     *
     * @returns {PizzaBuilder}
     */
    addPepperoni(): PizzaBuilder {
        this.pepperoni = true;
        return this;
    }
    /**
     * Function to add bacon ingredient
     *
     * @returns {PizzaBuilder}
     */
    addBacon(): PizzaBuilder {
        this.bacon = true;
        return this;
    }
    /**
     * Function to add mushrooms ingredient
     *
     * @returns {PizzaBuilder}
     */
    addMushrooms(): PizzaBuilder {
        this.mushrooms = true;
        return this;
    }
    /**
     * Function to add meat ingredient
     *
     * @returns {PizzaBuilder}
     */
    addMeat(): PizzaBuilder {
        this.meat = true;
        return this;
    }
    /**
     * Function to build new Pizza object
     *
     * @returns {Pizza}
     */
    build(): Pizza {
        return new Pizza(this);
    }
}