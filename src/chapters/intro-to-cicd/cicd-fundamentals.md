Something Random!

If you've ever deployed an app by hand — copying files, running commands in the right order, hoping nothing breaks — you already understand the problem that CI/CD solves.

Manual deployments are slow, error-prone, and nerve-wracking. One wrong step and your app is down. And the more developers working on the same codebase, the messier it gets: code conflicts, untested changes, the dreaded "it worked on my machine" moment.

**CI/CD** (Continuous Integration and Continuous Deployment) is how modern development teams ship code quickly and confidently — by automating the process of testing and deploying every change.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JxqfiBHBzl8?si=xpZ5U8iv1AB77qMz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Think of CI/CD like an assembly line for your code. When a change is added to the line, it moves through a series of checkpoints — some automated, some requiring a human decision — before it's ready to ship. If something is off at any checkpoint, the line stops and alerts the team immediately. If everything looks good, the change keeps moving forward. That's exactly what CI/CD does for software.

That defined sequence of steps — from pushing code all the way to deploying it — is called a **pipeline**. Just like a physical pipeline carries water from one place to another, a CI/CD pipeline carries your code from your editor to your users, passing through stages like building, testing, code review, and deploying along the way. Some of those stages are fully automated; others, like a code review or a production approval, involve a human. You'll hear this term constantly, and it always refers to that defined sequence of steps your code moves through on its way to production.

By the end of this chapter, you'll be able to:

- Explain what Continuous Integration and Continuous Deployment mean
- Describe why CI/CD makes deployments faster and safer
- Compare a traditional deployment to a CI/CD workflow
- Recognize the most common tools used to build CI/CD pipelines

### Continuous Integration (CI)

**Continuous Integration** is the practice of merging code changes into a shared repository frequently — and running automated tests every single time.

Here's why that matters: imagine two developers working on the same project for two weeks without merging their code. When they finally combine their work, there are conflicts everywhere. Tests fail. Nobody's sure what broke what. This is called **integration hell**, and it's as painful as it sounds.

CI prevents this by encouraging small, frequent merges and automatically running your test suite on every change. The moment a test fails, the team knows exactly what broke and when — before it has a chance to affect anyone else.

**A typical CI flow looks like this:**

1. A developer pushes code to the repository
2. The CI system detects the change and kicks off an automated build
3. Automated checks run — linting, tests, and other validations
4. A teammate reviews the code and approves or requests changes
5. If all checks pass and the review is approved, the change is accepted; if anything fails, the developer is notified immediately
6. The team fixes issues right away, while the code is still fresh

The key idea: **catch problems early, when they're still cheap to fix.**

### Continuous Delivery vs. Continuous Deployment (CD)

Once your CI pipeline is green, what happens next? That's where the **CD** part comes in — and there are actually two related ideas here.

**Continuous Delivery** means your code is automatically built, tested, and packaged so that it's *always ready to deploy*. The actual push to production still requires a human to approve it, but you could ship at any moment with confidence.

**Continuous Deployment** goes one step further: every change that passes all automated tests is deployed to production *automatically* — no manual approval needed.

| | Continuous Delivery | Continuous Deployment |
|---|---|---|
| Automated testing | ✅ | ✅ |
| Deploys to staging automatically | ✅ | ✅ |
| Deploys to production automatically | ❌ (human approves) | ✅ |
| Best for | Teams that need release control | Teams with high confidence in their test suite |

Most teams start with Continuous Delivery and move toward full Continuous Deployment as their testing and monitoring matures. Either way, the goal is the same: **eliminate the fear of deploying.**

## Why CI/CD Makes a Difference

Here's what changes when your team adopts CI/CD:

**You ship faster.** Instead of batching up weeks of changes into a single scary release, you push small updates continuously. Smaller changes are easier to review, easier to test, and much easier to roll back if something goes wrong.

**You catch bugs earlier.** Every push triggers your test suite. Bugs get flagged minutes after they're introduced — not during a late-night deployment three weeks later.

**Deployments stop being scary.** When deployment is automated and happens all the time, it becomes routine. Teams that deploy dozens of times a day treat it as a non-event.

**You spend less time on manual work.** Automation handles the repetitive stuff — running tests, building artifacts, deploying to environments — so developers can stay focused on writing code.

## Traditional Deployment vs. CI/CD

It helps to see the contrast side by side:

| | Traditional Deployment | CI/CD Workflow |
|---|---|---|
| How often code is merged | Infrequently (every few weeks) | Frequently (multiple times per day) |
| Testing | Manual, done by a QA team | Automated, runs on every push |
| Deployment | Manual, risky, high-stakes | Automated, routine, low-risk |
| When bugs are found | Late — often in production | Early — right when code is pushed |
| Rolling back a bad release | Painful and complex | Fast and straightforward |

The biggest mindset shift with CI/CD is moving from **big, infrequent releases** to **small, continuous changes**. It requires investing in automated testing upfront, but that investment pays off quickly.

## Common CI/CD Tools

There are several platforms that help teams build CI/CD pipelines. They all follow a similar idea: you define your pipeline in a configuration file (usually YAML), and the platform executes it automatically when changes are pushed.

<iframe width="560" height="315" src="https://www.youtube.com/embed/a1TWV74pNh8?si=FGrEcn7-aUvdjiKS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- **GitHub Actions** — built directly into GitHub; pipelines are defined as YAML files in your repo. This is what we'll be using in this course.
- **Jenkins** — a powerful, self-hosted open-source option with a huge plugin ecosystem
- **GitLab CI/CD** — similar to GitHub Actions but built into the GitLab platform
- **CircleCI** — a cloud-based service with fast builds and good caching support
- **AWS CodePipeline** — AWS's native CI/CD tool, tightly integrated with other AWS services

Each tool has tradeoffs around cost, control, and how tightly it integrates with your existing infrastructure. For this course, we'll use **GitHub Actions** because it lives right alongside your code and has a generous free tier.

## What We'll Do Next

Now that you have a mental model for what CI/CD is and why it matters, it's time to see it in action. In the next chapter, we'll explore GitHub Actions — how workflows are structured, how to write your first pipeline, and how to connect it to real infrastructure in AWS.
