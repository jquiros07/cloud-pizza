import { PizzaBuilder } from "./pizzaBuilder";

/**
 * Pizza class for builder design pattern.
 * To simulate the pizza ordering process.
 *
 * @export
 * @class Pizza
 * @typedef {Pizza}
 */
export class Pizza {
    /**
     * Pizza class property size
     *
     * @private
     * @type {string}
     */
    private size: string;
    /**
     * Pizza class property pepperoni
     *
     * @private
     * @type {boolean}
     */
    private pepperoni: boolean;
    /**
     * Pizza class property bacon
     *
     * @private
     * @type {boolean}
     */
    private bacon: boolean;
    /**
     * Pizza class property mushrooms
     *
     * @private
     * @type {boolean}
     */
    private mushrooms: boolean;
    /**
     * Pizza class property meat
     *
     * @private
     * @type {boolean}
     */
    private meat: boolean;
    /**
     * Creates an instance of Pizza.
     *
     * @constructor
     * @param {PizzaBuilder} builder
     */
    constructor(builder: PizzaBuilder) {
      this.size = builder.size;
      this.pepperoni = builder.pepperoni;
      this.bacon = builder.bacon;
      this.mushrooms = builder.mushrooms;
      this.meat = builder.meat;
    }
  }