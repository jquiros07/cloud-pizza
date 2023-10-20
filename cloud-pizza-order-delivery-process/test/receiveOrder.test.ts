import { handler } from '../lambda-functions/receiveOrder';
import { faker } from '@faker-js/faker';

/* Test to handle the order request and return correct response */
describe('receiveOrder Lambda Function', () => {
    it('should handle the order request and return response', async () => {
        
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
        let mockAddPineapple = faker.helpers.enumValue(addIngredientOrNot);

        let requestingPineappleAsIngredientValue = (mockAddPineapple == 'yes') ? true : false;

        //Create request object
        let event: Object = {
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

        //Create response object
        let expectedOutput: Object = {
            message: 'Order received',
            order: {
                orderName : mockOrderName,
                deliveryAddress: mockDeliveryAddress,
                pizza: {
                    size: mockPizzaSize,
                    pepperoni: mockAddPepperoni,
                    bacon: mockAddBacon,
                    mushrooms: mockAddMushrooms,
                    meat: mockAddMeat,
                    pineapple: mockAddPineapple
                }
            },
            requestingPineappleAsIngredient: requestingPineappleAsIngredientValue, 
        };

        //Call the lambda handler function
        const result = await handler(event);

        //Assertions based on the expected behavior of Lambda function
        expect(result).toEqual(expectedOutput);
    });
});

/* Test to assure the requestingPineappleAsIngredient value is beign assigned correctly according to the input send */
describe('receiveOrder Lambda Function', () => {
    it('should return the correct requestingPineappleAsIngredient value according to input', async () => {
        
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

        //Create request objects
        let eventWithPinneapple: Object = {
            orderName: mockOrderName,
            deliveryAddress: mockDeliveryAddress,
            pizza: {
                size: mockPizzaSize,
                pepperoni: mockAddPepperoni,
                bacon: mockAddBacon,
                mushrooms: mockAddMushrooms,
                meat: mockAddMeat,
                pineapple: 'yes'
            }
        };

        let eventWithoutPinneapple: Object = {
            orderName: mockOrderName,
            deliveryAddress: mockDeliveryAddress,
            pizza: {
                size: mockPizzaSize,
                pepperoni: mockAddPepperoni,
                bacon: mockAddBacon,
                mushrooms: mockAddMushrooms,
                meat: mockAddMeat,
                pineapple: 'no'
            }
        };

        //Call the lambda handler function
        const resultEventWithPineapple = await handler(eventWithPinneapple);
        const resultEventWithoutPineapple = await handler(eventWithoutPinneapple);

        //Assertions based on the expected behavior of Lambda function
        expect(resultEventWithPineapple.requestingPineappleAsIngredient).toEqual(true);
        expect(resultEventWithoutPineapple.requestingPineappleAsIngredient).toEqual(false);
    });
});