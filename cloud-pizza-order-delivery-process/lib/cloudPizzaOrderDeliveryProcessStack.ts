import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as stepFn from 'aws-cdk-lib/aws-stepfunctions';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sns from 'aws-cdk-lib/aws-sns';

import { Construct } from 'constructs';

/**
 * Class that defines an AWS CDK Stack for cloud infrastructure development.
 * The following code creates line by line an infrastructure that simulates a pizza order and delivery flow.
 * Using mainly AWS Lambda Functions, AWS Step Functions, AWS SNS and AWS Api Gateway.
 *
 * @export
 * @class CloudPizzaOrderDeliveryProcessStack
 * @typedef {CloudPizzaOrderDeliveryProcessStack}
 * @extends {cdk.Stack}
 */
export class CloudPizzaOrderDeliveryProcessStack extends cdk.Stack {
  /**
   * Creates an instance of CloudPizzaOrderDeliveryProcessStack.
   *
   * @constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {?cdk.StackProps} [props]
   */
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Creating SNS topic for customer failure notification
    const snsTopic = new sns.Topic(this, 'ProcessErrorTopic', {
      displayName: 'Order Process Failure Notification',
    });

    /** Lambda functions init **/

    //Lambda function in charge of receiving the order and checking if there is a specific petition for pineapple
    const receiveOrderLambda: lambdaNode.NodejsFunction = new lambdaNode.NodejsFunction(this, 'ReceiveOrderLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: './lambda-functions/receiveOrder.ts',
      handler: "handler",
      timeout: cdk.Duration.seconds(3)
    });

    //Lambda function in charge of the pizza preparing process, before cooking
    const preparePizzaLambda: lambdaNode.NodejsFunction = new lambdaNode.NodejsFunction(this, 'PreparePizzaLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: './lambda-functions/preparePizza.ts',
      handler: "handler",
      timeout: cdk.Duration.seconds(3)
    });

    //Lambda function in charge of the pizza baking process
    const bakePizzaLambda: lambdaNode.NodejsFunction = new lambdaNode.NodejsFunction(this, 'BakePizzaLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: './lambda-functions/bakePizza.ts',
      handler: "handler",
      timeout: cdk.Duration.seconds(3)
    });

    //Lambda function in charge of pizza packaging
    const packPizzaLambda: lambdaNode.NodejsFunction = new lambdaNode.NodejsFunction(this, 'PackPizzaLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: './lambda-functions/packPizza.ts',
      handler: "handler",
      timeout: cdk.Duration.seconds(3)
    });

    //Lambda function in charge of delivering the order
    const deliverOrderLambda: lambdaNode.NodejsFunction = new lambdaNode.NodejsFunction(this, 'DeliverOrderLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: './lambda-functions/deliverOrder.ts',
      handler: "handler",
      timeout: cdk.Duration.seconds(3)
    });

    /** Tasks init **/

    //Step function invoking lambda function receiveOrderLambda previously defined
    const receiveOrderTask: tasks.LambdaInvoke = new tasks.LambdaInvoke(this, 'ReceiveOrderTask', {
      lambdaFunction: receiveOrderLambda,
      inputPath: '$.body',
      resultPath: '$.orderProcess',
      payloadResponseOnly: true
    });

    //Step function invoking lambda function preparePizzaLambda previously defined
    const preparePizzaTask: tasks.LambdaInvoke = new tasks.LambdaInvoke(this, 'PreparePizzaTask', {
      lambdaFunction: preparePizzaLambda,
      inputPath: '$.orderProcess',
      resultPath: '$.orderProcess',
      payloadResponseOnly: true
    });

    //Step function invoking lambda function bakePizzaLambda previously defined
    const bakePizzaTask: tasks.LambdaInvoke = new tasks.LambdaInvoke(this, 'BakePizzaTask', {
      lambdaFunction: bakePizzaLambda,
      inputPath: '$.orderProcess', 
      resultPath: '$.orderProcess',
      payloadResponseOnly: true
    });

    //Step function invoking lambda function packPizzaLambda previously defined
    const packPizzaTask: tasks.LambdaInvoke = new tasks.LambdaInvoke(this, 'PackPizzaTask', {
      lambdaFunction: packPizzaLambda,
      inputPath: '$.orderProcess', 
      resultPath: '$.orderProcess',
      payloadResponseOnly: true
    });

    //Step function invoking lambda function deliverPizzaLambda previously defined
    const deliverOrderTask: tasks.LambdaInvoke = new tasks.LambdaInvoke(this, 'DeliverOrderTask', {
      lambdaFunction: deliverOrderLambda,
      inputPath: '$.orderProcess', 
      resultPath: '$.orderProcess'
    });

    //Step function task to show the error message to the customer and notify
    const generalErrorFail: stepFn.Fail = new stepFn.Fail(this, "Error during order process. Order cancelled.", {
      cause: 'An unknown error happened during the order process.',
      error: 'We are having problems processing your order, our apologies.',
    });

    //Step function task to publish messages to SNS topic
    const failureHandlerSnsPublishTask = new tasks.SnsPublish(this, 'FailureHandlerTask', {
      topic: snsTopic,
      message: stepFn.TaskInput.fromText('We are having problems processing your order, our apologies')
    }).next(generalErrorFail);
    
    //Subscribe a production support email address to the SNS topic to receive notifications about the issue
    new sns.Subscription(this, 'ProductionSupportEmailSubscription', {
      endpoint: 'supportdummyemail@mail.com', //Add production support email
      protocol: sns.SubscriptionProtocol.EMAIL,
      topic: snsTopic,
    });

    //Adding catch to handle exceptions to the process flow
    receiveOrderTask.addCatch(failureHandlerSnsPublishTask, { errors: ['States.ALL'] });
    preparePizzaTask.addCatch(failureHandlerSnsPublishTask, { errors: ['States.ALL'] });
    bakePizzaTask.addCatch(failureHandlerSnsPublishTask, { errors: ['States.ALL']});
    packPizzaTask.addCatch(failureHandlerSnsPublishTask, { errors: ['States.ALL'] });
    deliverOrderTask.addCatch(failureHandlerSnsPublishTask, { errors: ['States.ALL'] });

    /** Choice, Succeed and Fail init **/

    //Fail state definition
    const pineappleFail: stepFn.Fail = new stepFn.Fail(this, "Pineapple requested as ingredient. Order canceled.", {
      cause: 'Customer asked for pineapple.',
      error: 'Failed to make pizza.',
    });

    //Choice state definition
    const completeOrderProcess: stepFn.Choice = new stepFn.Choice(this, 'Pineapple?')
      .when(
        stepFn.Condition.booleanEquals('$.orderProcess.requestingPineappleAsIngredient', true), pineappleFail)
      .otherwise(
        preparePizzaTask
        .next(bakePizzaTask)
        .next(packPizzaTask)
        .next(deliverOrderTask)
      );

    /** State Machine init **/
    
    //Definition of state machine flow
    const definition: stepFn.Chain = stepFn.Chain
      .start(receiveOrderTask)
      .next(completeOrderProcess);

    //Definition of state machine
    const stateMachine: stepFn.StateMachine = new stepFn.StateMachine(this, 'PizzaOrderDeliveryStateMachine', {
      definition,
      timeout: cdk.Duration.minutes(5),
      tracingEnabled: true,
      stateMachineType: stepFn.StateMachineType.EXPRESS
    });

    /** API Gateway init **/

    //Assigning api gateway to state machine
    const api = new apiGateway.StepFunctionsRestApi(this, 'PizzaOrderDeliveryApi', { stateMachine: stateMachine });

    const integration = new apiGateway.Integration({
      type: apiGateway.IntegrationType.HTTP_PROXY,
      options: {
        connectionType: apiGateway.ConnectionType.INTERNET,
        requestParameters: {
          Input: "$request.body",
          StateMachineArn: stateMachine.stateMachineArn
        }
      },
    });

    //Output the Api URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url ?? 'No URL generated',
    });
  }
}