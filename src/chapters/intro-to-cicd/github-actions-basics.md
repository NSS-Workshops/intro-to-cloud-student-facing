
GitHub Actions is a CI/CD platform that allows you to automate your software development workflows 
directly in your GitHub repository. 
With GitHub Actions, you can build, test, and deploy your code right from GitHub, as well as automate 
other tasks like issue triage, dependency updates, and more.

### Key Features of GitHub Actions

- **Integrated with GitHub**: Built directly into the GitHub platform
- **Workflow as Code**: Define workflows using YAML files
- **Event-driven**: Trigger workflows based on GitHub events
- **Reusable Actions**: Use pre-built actions from the marketplace
- **Secrets Management**: Securely store and use sensitive information

### GitHub Actions vs. Other CI/CD Tools

| Feature | GitHub Actions | Jenkins | CircleCI | GitLab CI |
|---------|---------------|---------|----------|-----------|
| Hosting | Cloud (or self-hosted runners) | Self-hosted | Cloud | Cloud (or self-hosted) |
| Configuration | YAML in repository | Jenkinsfile or UI | YAML in repository | YAML in repository |
| Integration | Native GitHub | Plugins | GitHub App | Native GitLab |
| Pricing | Free tier with minutes | Free (self-hosted) | Free tier with credits | Free tier with minutes |
| Marketplace | Large ecosystem | Plugin ecosystem | Orbs ecosystem | Limited marketplace |
| Setup Complexity | Low | High | Medium | Medium |

## Anatomy of a Workflow File

GitHub Actions workflows are defined in YAML files stored in the `.github/workflows` directory of your repository. 
Let's examine an example workflow file that would run whenever code is pushed to the repository.

### Basic Workflow Structure

```yaml
name: CI  # The name that appears in the Actions tab on GitHub

on:
  push:
    branches: [ main ]         # Runs when code is pushed directly to main
  pull_request:
    branches: [ main ]         # Runs when a PR targeting main is opened or updated

jobs:
  build:                       # The name of this job — can be anything
    runs-on: ubuntu-latest     # Runs on a fresh Ubuntu virtual machine hosted by GitHub
    
    steps:
    - uses: actions/checkout@v3       # Checks out your repo code onto the runner
    
    - name: Set up Node.js
      uses: actions/setup-node@v3    # Installs Node.js on the runner
      with:
        node-version: '16'           # Specifies which version of Node.js to use
        
    - name: Install dependencies
      run: npm ci                    # Installs packages from package-lock.json
      
    - name: Run tests
      run: npm test                  # Runs your test suite
```

### 🏗️ How It Works
- 1️⃣ You push code to your GitHub repository.
- 2️⃣ GitHub looks in .github/workflows/ for YAML files.
- 3️⃣ For each workflow file:
  - GitHub checks if the trigger conditions match (e.g., on: push to main).
  - If yes, it launches a runner (like a mini virtual machine) to execute the steps.
- 4️⃣ The runner:
  - Reads and interprets each step (run:, uses:) 
  - Executes them in order until done or a failure occurs.


### Exploring a Real-World GitHub Actions Workflow in a Vite Project
To explore a real-world example of a GitHub Actions workflow for deploying a 
Vite-based frontend application, you can examine the [vite-deploy-demo](https://github.com/sitek94/vite-deploy-demo) 
repository. This project demonstrates how to automate the build and deployment process 
of a Vite app to GitHub Pages using GitHub Actions.

#### 🧭 Navigating to the Actions Tab

1. **Open the Repository**: Visit the [vite-deploy-demo repository](https://github.com/sitek94/vite-deploy-demo) in your web browser.
2. **Access the Actions Tab**: At the top of the repository page, click on the **"Actions"** tab.
3. **Explore Workflows**: Within the Actions tab, you'll see a list of workflows that have been set up for 
the repository. Clicking on any workflow will provide details about its configuration, recent runs, and logs.
This section is invaluable for understanding how the repository automates tasks like testing, 
building, and deploying code using GitHub Actions.


### Key Components Explained

<iframe width="560" height="315" src="https://www.youtube.com/embed/Szykgp7yl4s?si=mMBkadxVYGr7-sZT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

1. **name**: The name of the workflow (appears in the Actions tab)
2. **on**: Defines the events that trigger the workflow
3. **jobs**: Groups of steps that execute on the same runner
4. **runs-on**: Specifies the type of machine to run the job on
5. **steps**: Individual tasks that run commands or actions
6. **uses**: References a reusable action
7. **with**: Provides inputs to an action
8. **run**: Executes shell commands

### Workflow Triggers

Workflows are triggered by events in your repository. The most common triggers you'll use are:

- **push**: Runs the workflow when commits are pushed to a branch
- **pull_request**: Runs the workflow when a pull request is opened or updated
- **workflow_dispatch**: Lets you trigger the workflow manually from the Actions tab in GitHub

```yaml
on:
  push:
    branches: [ main, develop ]

  pull_request:
    branches: [ main ]

  # Manual trigger — useful for deployments you want to control
  workflow_dispatch:
```

### Jobs and Steps

A workflow consists of one or more jobs. By default, jobs run in parallel — but you can make one job wait for another using `needs`:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
        
  build:
    needs: test  # This job runs after 'test' completes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm run build
```

## Using Actions from the Marketplace

One of the most powerful features of GitHub Actions is the ability to use pre-built actions from the GitHub Marketplace.

### Finding Actions

1. Visit the [GitHub Marketplace](https://github.com/marketplace?type=actions)
2. Browse or search for actions by category or keyword
3. Review the action's documentation, usage, and popularity

### Popular Actions

#### Checkout Code

```yaml
- uses: actions/checkout@v3
```

#### Setup Language Environments

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '16'
    cache: 'npm'
    
- uses: actions/setup-python@v4
  with:
    python-version: '3.10'
```

#### Uploading Artifacts
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: my-artifact
    path: dist/
```

#### Deployment Actions

```yaml
- uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

## Hands-on Exercise: Create a Basic CI Workflow

In the next chapter, we'll build on this foundation to create a complete deployment pipeline for our rock of ages frontend application.
