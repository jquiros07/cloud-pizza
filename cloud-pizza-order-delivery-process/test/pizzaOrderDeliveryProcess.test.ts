import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CloudPizzaOrderDeliveryProcess from '../lib/cloudPizzaOrderDeliveryProcessStack';

/* Test to assure SNS topic is created so the step functions can use it to publish */
test('SNS topic for step functions created successfully', () => {

  //Initialize mock cdk stack
   const app = new cdk.App();
   const stack = new CloudPizzaOrderDeliveryProcess.CloudPizzaOrderDeliveryProcessStack(app, 'MyMockStack');

   //Get template from mock stack
   const template = Template.fromStack(stack);

   //Verify if resource exists
   template.resourceCountIs('AWS::SNS::Topic', 1)
});

/* Test to assure the state machine is created */
test('State machine created successfully', () => {

  //Initialize mock cdk stack
  const app = new cdk.App();
  const stack = new CloudPizzaOrderDeliveryProcess.CloudPizzaOrderDeliveryProcessStack(app, 'MyMockStack');

  //Get template from mock stack
  const template = Template.fromStack(stack);

  //Verify if resource exists
  template.resourceCountIs('AWS::StepFunctions::StateMachine', 1)
});
