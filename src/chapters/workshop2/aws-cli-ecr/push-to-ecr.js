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

Follow the prompts to set up your sso profile. You will need the values listed here:
  - The start url will be \`https://nss-se.awsapps.com/start/\`
  - Choose the \`intro_to_cloud\` role. 
  - Set the region to \`us-east-2\`.
  - The output format will be \`json\`.
  - Name the profile after the role \`intro_to_cloud\`. 
  - There should only be one account available to you, the cli should automatically use that account number. 

**What's happening here?** This is creating a local file \`~/.aws/cli/config\` with configurations that the cli will use when accessing AWS resources. You can find that local file and take a look at the contents. 


2. You may be already logged in but in case not run \`aws sso login --profile intro_to_cloud\`. After 4 hours your credentials will expire and you will need to run this login command again. 


3. Check that your CLI is configured. Try running \`aws s3 ls --profile intro_to_cloud\`. This will list any buckets you have created in s3. 

💡 **What's happening here?** When you login to AWS with SSO, whether in the browser or from the command line, AWS is using STS (Security Token Service) to give you temporary credentials so you can interact with AWS services securely without needing long-lived IAM user credentials.In the case of CLI, those credentials are being provided to your local computer and automatically stored in \`~/.aws/sso/cache\`. 

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