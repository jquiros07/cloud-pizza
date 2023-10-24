# Cloud Pizza
This project sets up an AWS infrastructure to handle the simulation of a pizza order-delivery process. 
This example uses AWS CDK, TypeScript, API Gateway, Lambda Functions, Step Functions, and SNS for notifications.
Its a brief and simple but broad example of the applications and capabilities of the AWS cloud and the practice of new 
development approaches like Infrastructure as Code (IaC).
It will walk through the setup process to test, deploy and build the project.

1. [IaC](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/infrastructure-as-code.html)
2. [AWS CDK](https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/aws-cdk.html)

![Cloud Pizza Order-Delivery Process](step_fn.PNG)
<h6 align="center">Cloud Pizza Order-Delivery Process</h6>

## Requirements
Not much really, just make sure to:
1. NodeJs installed (v18.x).<br />
    1.1. [NodeJs](https://nodejs.org/en/download/current)<br />
    1.2. To check if node its installed and the current version run in the command line "node -v". It should display NodeJs version.
    <pre><code>
    node -v
    </code></pre>
2. Have an AWS account.<br />
   2.1 [AWS Acccount](https://docs.aws.amazon.com/accounts/latest/reference/welcome-first-time-user.html)<br />
4. AWS CLI installed.<br />
    3.1 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)<br />
5. Postman for api testing.<br />
    4.1 [Postman](https://www.postman.com/downloads/)

## Installation
1. Clone the repository.<br />
    1.1. [Clone Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Install dependencies.<br />
    2.1. Navigate to the project directory selected as destination for the repository.<br />
    2.2. Locate in the root directory and execute "npm install".
        <pre><code>
        npm install
        </code></pre>
        It will install the aws-cdk package, wait a little.<br />
    2.3. Next move into the subdirectory "cloud-pizza-order-delivery-process", once there execute "npm install" to install the other dependencies and wait a little.
        <pre><code>
        npm install
        </code></pre>

## Unit Testing
1. To execute the unit tests, locate inside the "cloud-pizza-order-delivery-process" directory and execute "npm run test".
    <pre><code>
    npm run test
    </code></pre>
2. There are 3 files of unit test inside the "test" directory.<br />
    2.1. deliverOrder.test.ts: test functionality for the order delivery step.<br />
    2.2. pizzaOrderDeliveryProcess.test.ts: test functionality deploying process assuring some main resources are created.<br />
    2.3. receiveOrder.test.ts: test functionality for the order receiving step.<br />
3. To execute the unit tests to specific files execute "npm run test file-name".
    <pre><code>
    npm run test deliverOrder.test.ts
    </code></pre>

## Deployment
- Configure the AWS CLI with acccess credentials. If this is already set, skip these steps.
- Execute "aws configure"
    <pre><code>
    aws configure
    </code></pre>
- Next, enter the data requested.
- With that done, the AWS CLI will save these values in a configuration file.
- To verify success execute "aws sts get-caller-identity". It outputs the IAM user data use in the credentials, keep the value of the "Account" output for next step.
    <pre><code>
    aws sts get-caller-identity
    </code></pre>

<br />

1. Now all set, to deploy the infrastructure, first it must execute the bootstrapping process. This is because AWS CDK requires some AWS services to be available. For this the AWS account number and region will be needed.
2. To execute bootstrapping, located inside the directory "cloud-pizza-order-delivery-process", execute "npm run cdk bootstrap aws://aws-account-number/aws-region".
    <pre><code>
    npm run cdk bootstrap aws://aws-account-number/aws-region
    </code></pre>
    Wait a couples of seconds while the infrastructure is being configured.
3. Once that, execute "npm run cdk deploy", and be patient. It may ask if the user wish to deploy the changes, answer yes.
    <pre><code>
    npm run cdk deploy
    </code></pre>
    <pre><code>
    Do you wish to deploy these changes (y/n)? y
    </code></pre>
4. If everything went well and the process is done, it will show 2 outputs and the Stack ARN. Keep the value of the output data "PizzaOrderDeliveryProcessStack.ApiUrl" for usage in the next step.
    <pre><code>
        Outputs:
        PizzaOrderDeliveryProcessStack.ApiUrl = https://aws-account-number.execute-api.aws-region.amazonaws.com/prod/
        PizzaOrderDeliveryProcessStack.PizzaOrderDeliveryApiEndpointaws-account-number = https://aws-account-number.execute-api.aws-region.amazonaws.com/prod/
        Stack ARN:
        arn:aws:cloudformation:aws-region:aws-account-number:stack/PizzaOrderDeliveryProcessStack/unique-identifier
    </code></pre>

## Usage
1. To test the api, it can be used a tool like Postman to send request and get response. Use the output from the deploy process.<br />
    1.1 [Send Postman Request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)<br />
2. Initiate the pizza order process.<br />
    2.1. Make POST request to the endpoint value of the output data "PizzaOrderDeliveryProcessStack.ApiUrl"<br />
    2.2. Request structure (this will return a success response).
    ```json
    {
        "orderName": "Peter Ferguson",
        "deliveryAddress": "street A1 apartment A67, NY",
        "pizza": {
            "size": "Large",
            "pepperoni" : "yes",
            "bacon" : "yes",
            "mushrooms" : "no",
            "meat" : "yes",
            "pineapple": "no"
        }
    }
    ```
    2.2 To receive a failure response set "pineapple" property to "yes" or remove the whole "pizza" object from the structure.
4. Successful execution response. The order status can be appreciated in the "orderProcessResult" section.
    ```json
    {
        "body": {
            "orderName": "Peter Ferguson",
            "deliveryAddress": "street A1 apartment A67, NY",
            "pizza": {
                "size": "Large",
                "pepperoni": "yes",
                "bacon": "yes",
                "mushrooms": "no",
                "meat": "yes",
                "pineapple": "no"
            }
        },
        "querystring": {},
        "path": {},
        "orderRequest": {
            "orderName": "Peter Ferguson",
            "deliveryAddress": "street A1 apartment A67, NY",
            "pizza": {
                "size": "Large",
                "pepperoni": "yes",
                "bacon": "yes",
                "mushrooms": "no",
                "meat": "yes",
                "pineapple": "no"
            },
            "orderReceived": true,
            "requestingPineappleAsIngredient": false
        },
        "orderProcessResult": {
            "orderIdentifier": "ORDddc04869-d548-4f21-8629-f7f5a0068f08",
            "order": {
                "orderName": "Peter Ferguson",
                "deliveryAddress": "street A1 apartment A67, NY",
                "pizza": {
                    "size": "Large",
                    "pepperoni": "yes",
                    "bacon": "yes",
                    "mushrooms": "no",
                    "meat": "yes",
                    "pineapple": "no"
                },
                "orderReceived": true,
                "requestingPineappleAsIngredient": false
            },
            "pizzaPrepared": true,
            "pizzaProductToDeliver": {
                "size": "Large",
                "pepperoni": true,
                "bacon": true,
                "mushrooms": false,
                "meat": true
            },
            "pizzaBaked": true,
            "pizzaPacked": true,
            "orderSent": true,
            "message": "Sending order!"
        }
    }
    ```
5. Failure execution response. "Pineapple" set to "yes".
    ```json
    {
        "error": "Failed to make pizza.",
        "cause": "Customer asked for pineapple."
    }
    ```
6. Failure execution response. No "pizza" data (an email will reach to productionsupportdummy@protonmail.com).
    ```json
    {
        "error": "We are having problems processing your order, our apologies.",
        "cause": "An unknown error happened during the order process."
    }
    ```
    5.1. To verify the email failure notification for this scenario, log into the dummy email account and check:<br />
      - Link: https://account.proton.me/login<br />
      - Email address: productionsupportdummy@protonmail.com<br />
      - Password: cloudpizzatest123!!<br />

## Cleanup
To remove the infrastructure and delete all resources created, execute "npm run cdk destroy".
It may ask to confirm the deletion, so type "yes".
    <pre><code>
     npm run cdk destroy
    </code></pre>
    <pre><code>
     Are you sure you want to delete: PizzaOrderDeliveryProcessStack (y/n)? y
    </code></pre>

## Useful commands
- "npm run build": compile typescript to javascript.
- "npm run cdk synth": emits the synthesized CloudFormation template.
    <pre><code>
    npm run cdk build
    </code></pre>
    <pre><code>
    npm run cdk synth
    </code></pre>
