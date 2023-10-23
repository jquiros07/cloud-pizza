import { PizzaBuilder } from '../builders/pizzaBuilder';
import { handler } from '../lambda-functions/deliverOrder';
import { faker } from '@faker-js/faker';
import { OrderProcess, OrderRequest } from '../types/order';

/* Test to verify the correct returned data from lambda function of final step */
describe('deliverOrder Lambda Function', () => {
    it('should handle the order and verify the correct returned data from lambda function of final step', async () => {
        
        //Mock fake data for testing
        enum pizzaSize { Large = 'Large', Medium = 'Medium', Small = 'Small'};
        enum addIngredientOrNot { Yes = 'yes', No = 'no'};

        let mockOrderName = `${faker.person.firstName()} ${faker.person.lastName()}`;
        let mockDeliveryAddress = faker.location.streetAddress();
        let mockPizzaSize = faker.helpers.enumValue(pizzaSize);
        let mockAddPepperoni = faker.helpers.enumValue(addIngredientOrNot);
        let mockAddBacon = faker.helpers.enumValue(addIngredientOrNot);
        let mockAddMushrooms = faker.helpers.enumValue(addIngredientOrNot);
        let mockAddMeat = faker.helpers.enumValue(addIngredientOrNot);
        let mockAddPineapple = 'no';

        //Create pizza test object
        let pizzaObjBuilderTest: PizzaBuilder = new PizzaBuilder(mockPizzaSize);
        pizzaObjBuilderTest.addBacon();
        pizzaObjBuilderTest.addMeat();
        pizzaObjBuilderTest.addMushrooms();
        pizzaObjBuilderTest.addPepperoni();

        let pizzaObjTest = pizzaObjBuilderTest.build();

        //Create Order Request object
        let orderRequest: OrderRequest = {
            orderName: mockOrderName,
            deliveryAddress: mockDeliveryAddress,
            pizza: {
                size: mockPizzaSize,
                pepperoni: mockAddPepperoni,
                bacon: mockAddBacon,
                mushrooms: mockAddMushrooms,
                meat: mockAddMeat,
                pineapple: mockAddPineapple
            }
        };

        //Mock order identifier
        let identifier = faker.string.uuid();

        //Create Order Process object
        let event: OrderProcess = {
            orderIdentifier: identifier,
            order: orderRequest,
            pizzaPrepared: true,
            pizzaBaked: true,
            pizzaPacked: true,
            pizzaProductToDeliver: pizzaObjTest
        };

        //Create Order Process output object
        let expectedOutput: OrderProcess = {
            orderIdentifier: identifier,
            order: orderRequest,
            pizzaPrepared: true,
            pizzaBaked: true,
            pizzaPacked: true,
            orderSent: true,
            pizzaProductToDeliver: pizzaObjTest,
            message: 'Sending order!'
        };

        //Call the lambda handler function
        const result = await handler(event);

        //Assertions based on the expected behavior of the Lambda function
        expect(result).toEqual(expectedOutput);
    });
});