import { PizzaBuilder } from '../builders/pizzaBuilder';
import { handler } from '../lambda-functions/deliverOrder';
import { faker } from '@faker-js/faker';

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
        let pizzaObjTest: PizzaBuilder = new PizzaBuilder(mockPizzaSize);
        pizzaObjTest.addBacon();
        pizzaObjTest.addMeat();
        pizzaObjTest.addMushrooms();
        pizzaObjTest.addPepperoni();
        pizzaObjTest.build();

        //Create request object
        let event: Object = {
            message: 'Packing pizza',
            order:{
                orderName: mockOrderName,
                deliveryAddress: mockDeliveryAddress,
                pizza: pizzaObjTest,
            }
        };

        let mockOrderIdentifier = `ORD${faker.string.uuid()}`;

        //Create response object
        let expectedOutput: Object = {
            message: 'Sending order',
            order:{
                orderIdentifier: mockOrderIdentifier, 
                orderName: mockOrderName,
                deliveryAddress: mockDeliveryAddress,
                pizza: pizzaObjTest,
            }
        };

        //Call the lambda handler function
        const result = await handler(event);
        const resultOrderObj = result.order;

        //Assertions based on the expected behavior of the Lambda function
        expect(resultOrderObj).toHaveProperty('orderIdentifier');
    });
});