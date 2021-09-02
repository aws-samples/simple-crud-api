# Welcome to HTTP CRUD API CDK TypeScript project!

This project contains the CDK code to deploy HTTP CRUD API as demonstrated in https://simple-crud-api.workshop.aws/. The CDK application creates the following resources:

* API Gateway
* Lambda Function
* DynamoDB Table

Please run `cdk deploy` to deploy this stack in your AWS account. You can access API using `{ApiGatewayUrl}/items`

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

