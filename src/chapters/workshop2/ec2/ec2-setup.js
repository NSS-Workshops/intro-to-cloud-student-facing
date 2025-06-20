export const ec2Chapter = {
  id: "ec2-setup",
  title: "Running Docker Container from ECR on EC2",
  sectionId: "ec2",
  previousChapterId: null,
  content: `## Running Your Docker Image on an EC2 Instance

In this chapter, you’ll launch an EC2 instance, attach an IAM role that allows ECR access, and pull and run your Docker container from ECR.


### 1. Set Up an EC2 Instance

1. From the **EC2 dashboard**, click **Launch Instance**
2. Give your instance a tag (e.g., \`Name: rock-of-ages-instance\`)
3. Choose the **Amazon Linux 2 AMI**
4. Select **t2.micro** as the instance type (free tier eligible)
5. Proceed **without a key pair** (for demo/testing purposes)
6. Under **Network settings**, click **Edit security groups**
7. Click **Add security group rule**
8. Set:
   - **Type**: HTTP
   - **Port range**: 80
   - **Source**: Anywhere (0.0.0.0/0)
9. Leave the remaining settings at default and click **Launch Instance**

💡 **What's happening here?** You're creating a virtual server (EC2) to host your Docker container. Amazon Linux 2 is a lightweight OS with Docker support, and t2.micro is a cost-effective choice for development. Adding a security group rule for port 80 allows your app to receive web traffic from the internet.


### 2. Attach IAM Role to EC2 for ECR and SSM Access

The instructors have already created a role \`Ec2AccessRole\` with the \`AmazonEC2ContainerRegistryReadOnly\` and \`AmazonSSMManagedInstanceCore\` policies, attach it to your EC2 instance:

1. In the **EC2 Console**, go to **Instances**
2. Select your instance
3. In the **Actions** dropdown, choose:  
   **Security > Modify IAM Role**
4. In the dialog, select \`Ec2AccessRole\`
5. Click **Update IAM Role**

💡 **What's happening here?** You're granting your EC2 instance permission to pull Docker images from ECR. This removes the need to manually manage credentials on the instance. The role uses a trust relationship to allow EC2 to assume it and access ECR on your behalf. The SSM policy will allow your github actions to run commands on your instance for our next CICD chapter. 


### 3. Install Docker and Run the Container on EC2

1. In the **EC2 Console**, select your instance and click **Connect**
2. Choose the **EC2 Instance Connect (browser-based shell)** option

Then run the following commands in the terminal:

#### Update system packages
\`\`\`bash
sudo yum update -y
\`\`\`

#### Install Docker
\`\`\`bash
sudo amazon-linux-extras install docker -y
\`\`\`

#### Start Docker and add EC2 user to Docker group
\`\`\`bash
sudo service docker start
sudo usermod -a -G docker ec2-user
\`\`\`

💡 **What's happening here?** This installs and starts Docker on your EC2 instance. Adding the EC2 user to the Docker group allows you to run Docker without using \`sudo\`.

#### Apply group changes
You may need to run:
\`\`\`bash
newgrp docker
\`\`\`

…or **reconnect** to the instance for Docker group permissions to take effect.


### 4. Authenticate Docker with ECR and Pull Image

#### Authenticate to ECR:
\`\`\`bash
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin [your_account_id].dkr.ecr.us-east-2.amazonaws.com
\`\`\`

Replace \`[your_account_id]\` with your actual AWS account ID.

💡 **What's happening here?** This uses the IAM role attached to your EC2 instance to generate a temporary token that Docker uses to log in to your private ECR registry.

#### Pull your Docker image:
\`\`\`bash
docker pull [your_account_id].dkr.ecr.us-east-2.amazonaws.com/rock-of-ages-api:latest
\`\`\`

If you get a permission error, try:
\`\`\`bash
newgrp docker
\`\`\`
…then re-run the pull command.

💡 **What's happening here?** You're downloading the Docker image that you previously pushed to ECR so it can be run on this instance.


### 5. Run the Docker Container

Start your container and map port 8000 to port 80 on the instance:

\`\`\`bash
docker run -d --name rock-of-ages-api -p 80:8000 [your_account_id].dkr.ecr.us-east-2.amazonaws.com/rock-of-ages-api:latest
\`\`\`

💡 **What's happening here?** This runs the container in detached mode and makes the app accessible via HTTP on port 80 (the default web port).


### 6. Test the Container in Your Browser

1. In the **EC2 Console**, select your instance
2. Copy the **Public IPv4 DNS** or IP address
3. Open Postman or your browser and go to:  
   \`http://<your-ec2-public-dns>\`

If your container serves a web app or API on port 8000, you should see the output!

💡 **What's happening here?** You're accessing your running app through port 80, which forwards requests to the container’s internal port 8000. Because you added a security group rule to allow inbound traffic on port 80, your EC2 instance can accept HTTP requests from the internet. Without this rule, your connection would time out.


## What We've Accomplished

In this chapter, you've:
- Launched and configured an EC2 instance
- Attached a role that grants access to ECR
- Installed Docker and authenticated with ECR
- Pulled and ran your Docker container on EC2

You’ve now deployed a containerized application on a live AWS server — powered by EC2 and ECR 🚀`,
  exercise: null,
}
