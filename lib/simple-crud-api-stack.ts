/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as cdk from '@aws-cdk/core';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import {HttpMethod} from '@aws-cdk/aws-apigatewayv2';
import {LambdaProxyIntegration} from "@aws-cdk/aws-apigatewayv2-integrations";

export class SimpleCrudApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //crate a dynamodb table
    const table = new ddb.Table(this, 'SimpleCrudApiTable', {
      tableName: 'http-crud-tutorial-items',
      partitionKey: {name: 'id', type: ddb.AttributeType.STRING},
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    //create a lambda function
    const fn = new lambda.Function(this, 'SimpleCrudApiFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: 'http-crud-tutorial-function'
    })

    //give dynamodb read write permission to lambda function
    table.grantReadWriteData(fn);

    //create an http api gateway
    const api =  new apigw.HttpApi(this, 'SimpleCrudApi', {
      apiName: 'http-crud-tutorial-api'
    })

    //create lambda proxy
    const lambdaProxy = new LambdaProxyIntegration({
      handler: fn
    })

    //add routes for all paths and methods
    api.addRoutes({
      path: '/items',
      methods: [HttpMethod.GET],
      integration: lambdaProxy
    });

    api.addRoutes({
      path: '/items/{id}',
      methods: [HttpMethod.GET],
      integration: lambdaProxy
    });

    api.addRoutes({
      path: '/items',
      methods: [HttpMethod.PUT],
      integration: lambdaProxy
    });

    api.addRoutes({
      path: '/items/{id}',
      methods: [HttpMethod.DELETE],
      integration: lambdaProxy
    });

    new cdk.CfnOutput(this, 'APIGatewayEndpoint', {
      exportName: 'APIGatewayEndpoint',
      value: api.apiEndpoint,
      description: 'The endpoint url of the API Gateway'
    });
  }
}
