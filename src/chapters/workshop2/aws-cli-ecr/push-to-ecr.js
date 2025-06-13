export const ecrSetupChapter = {
  id: "cli-ecr",
  title: "Pushing Docker Image to AWS ECR",
  sectionId: "aws-cli-ecr",
  previousChapterId: null,
  content: `## Configuring AWS CLI with Session Token and Pushing Docker Image to ECR

In this guide, you'll learn how to configure your AWS CLI using temporary credentials (session token), create an Amazon ECR (Elastic Container Registry) repository, and push your Docker image to it.

### 1. Configure AWS CLI Using Session Token

1. Configure your AWS CLI profile

    \`\`\`bash
    aws configure sso
    \`\`\`

Follow the prompts to set up and name your profile (e.g., \`nss-sso\`). The region will be \`us-east-2\` and the output format will be \`json\`.

**What's happening here?** This is creating a local file \`~/.aws/config\` with configurations that the cli will use when accessing AWS resources.


2. Use the AWS CLI to assume the intro_to_cloud role

   \`\`\`bash
   aws sts assume-role \
     --role-arn arn:aws:iam::[your-account-id]:role/intro_to_cloud \
     --role-session-name tempSession \
     --profile [your-sso-profile-name]
   \`\`\`

Get your account id by clicking your username in the top right hand corner in the AWS console to replace \`[your-account-id]\`. For \`[your-sso-profile-name]\` use the same profile name you used during the sso configuration.

3. Copy the \`AccessKeyId\`, \`SecretAccessKey\`, and \`SessionToken\` from the output.

4. Set them as environment variables:
   \`\`\`bash
   export AWS_ACCESS_KEY_ID="[AccessKeyId]"
   export AWS_SECRET_ACCESS_KEY="[SecretAccessKey]"
   export AWS_SESSION_TOKEN="[SessionToken]"
   export AWS_DEFAULT_REGION="us-east-2"
   \`\`\`

This is saving these values in the current shell session's memory. These environment variables only last for your current terminal session.


5. Check that your CLI is configured. Try running \`aws s3 ls\`. This will list any buckets you have created in s3. 

💡 **What's happening here?** You're using AWS STS (Security Token Service) to get temporary credentials so you can interact with AWS services securely without needing long-lived IAM user credentials.

💡 **Why use a session token?** Temporary credentials are typically used for federated or assumed roles, offering limited-time access and increased security.

### 2. Create an ECR Repository

Now create an ECR repository to store your Docker image:

1. In the AWS console navigate to ECR (Elastic Container Repository)
2. Click **Create repository**
3. For **Repository name**, enter rock-of-ages-api
4. Leave the remaining settings at their defaults
5. Click **Create repository**


### 3. Authenticate Docker with ECR

Run the following to authenticate Docker with your ECR registry:

\`\`\`bash
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin [your_account_id].dkr.ecr.us-east-2.amazonaws.com
\`\`\`

Replace \`[your_account_id]\` with your actual AWS account ID. You can find this by clicking on your username at the top right in the aws console. 

### 4. Build, Tag, and Push Your Docker Image

Navigate to your rock-of-ages-api project directory, then run the following commands:


1. Build the image
\`\`\`bash
docker build -t rock-of-ages-api .
\`\`\`

2. Tag the image with the ECR repo URI
\`\`\`bash
docker tag rock-of-ages-api:latest [your_account_id].dkr.ecr.us-east-2.amazonaws.com/rock-of-ages-api:latest
\`\`\`

3. Push the image to ECR
\`\`\`bash
docker push [your_account_id].dkr.ecr.us-east-2.amazonaws.com/rock-of-ages-api:latest
\`\`\`

💡 After this step, your Docker image will be available in ECR and ready to be pulled and deployed from anywhere you have AWS access. You should be able to see your image in the repository in your aws console.

## What We've Accomplished

In this chapter, you've:
- Configured AWS CLI with temporary credentials
- Created a private ECR repository
- Built and pushed your Docker image to AWS ECR

You're now ready to deploy your Docker containers using images stored securely in ECR!`,
  exercise: null,
}