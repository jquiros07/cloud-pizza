#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CloudPizzaOrderDeliveryProcessStack } from '../lib/cloudPizzaOrderDeliveryProcessStack';

const app = new cdk.App();
new CloudPizzaOrderDeliveryProcessStack(app, 'PizzaOrderDeliveryProcessStack');
app.synth();