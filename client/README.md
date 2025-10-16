# Quiz Frontend

A React + Vite-based frontend for the quiz application, supporting ranking display, result sharing, and seamless
integration with the backend API. The frontend is deployed on **AWS S3 + CloudFront** and uses **GitHub Actions** for
automated CI/CD.

## Features

- Quiz participation and result display
- User ranking based on accumulated correct answers
- Shareable result links
- Responsive UI built with React

## Setup For Local

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/little-steps.git
   cd client

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the application in development**
   ```bash
   npm run dev
   ````

4. **Build for production**
   ```bash
   npm run build
   ```
   The compiled assets will be generated in the `dist/` directory.

## Deployment AWS
The frontend is deployed to AWS using **S3 + CloudFront**:

- Static assets (`.js`, `.css`, images, etc.) are uploaded with long-term cache headers.
- `index.html` is uploaded with no-cache headers to ensure users always get the latest build.
- CloudFront is invalidated automatically after each deployment.

For deployment instructions and CI/CD setup, please refer to the `.github` directory in this repository.

Automatic deployment instruction:

- In the repository’s `Variables`, configure:
    - AWS_REGION: your `region`
    - AWS_ROLE_TO_ASSUME: `arn:aws:iam::<AWS account ID>:role/<OIDC role name>`
    - CF_DISTRIBUTION_ID: your `CloudFront distribution ID`
    - S3_BUCKET: your `S3 bucket name`

- Set up the corresponding role in AWS with the following trust policy:
```aiignore
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::<AWS account ID>:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:<GitHub username>/<Repo name>:ref:refs/heads/main"
                }
            }
        }
    ]
}
```

- Attach policy to this role:
```aiignore
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::<S3 bucket name>"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::<S3 bucket name>/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "arn:aws:cloudfront::<AWS account ID>:distribution/<Distribution ID>"
        }
    ]
}
```

- Set up provider following the steps below:
    - Console → IAM → Identity providers → Add provider

    - Provider type：`OpenID Connect`

    - Provider URL：`https://token.actions.githubusercontent.com`

    - Audience：`sts.amazonaws.com`

- The automatic deployment scripts stored at `.github/workflows/frontend.yml`
- With the above configuration, simply run the GitHub Actions workflow to deploy automatically.
  Push to your target branch (e.g., `main`) or trigger the workflow manually in Actions → `Run workflow`.
