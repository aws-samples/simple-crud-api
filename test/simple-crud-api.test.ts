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

import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SimpleCrudApi from '../lib/simple-crud-api-stack';

test('API Gateway Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SimpleCrudApi.SimpleCrudApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::ApiGatewayV2::Api",{
      ProtocolType: 'HTTP'
    }));
});

test('Lambda Function Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SimpleCrudApi.SimpleCrudApiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Runtime: 'nodejs14.x'
    }));
});

test('DynamoDB Table Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SimpleCrudApi.SimpleCrudApiStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table"));
});
