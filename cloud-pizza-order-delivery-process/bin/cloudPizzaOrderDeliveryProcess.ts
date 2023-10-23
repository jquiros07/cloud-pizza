#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CloudPizzaOrderDeliveryProcessStack } from '../lib/cloudPizzaOrderDeliveryProcessStack';

/**
 * Initialize and create AWS CDK application
 *
 * @type {cdk.App}
 */
const app: cdk.App = new cdk.App();
new CloudPizzaOrderDeliveryProcessStack(app, 'PizzaOrderDeliveryProcessStack');
app.synth();