// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { SimpleCrudApiStack } from '../lib/simple-crud-api-stack';

const app = new cdk.App();
new SimpleCrudApiStack(app, 'SimpleCrudApiStack');
