# AWS Deployment Guide: Online Examination System

This guide provides the necessary steps to deploy your modernized Online Examination System onto **AWS Elastic Beanstalk** (Backend) and **AWS Amplify** (Frontend).

---

## 🏗️ Backend: AWS Elastic Beanstalk

The backend is built as a Node.js application. Elastic Beanstalk will automatically manage the infrastructure for you.

### 1. Environment Configuration
In your Elastic Beanstalk dashboard, navigate to **Configuration > Software > Environment properties** and add the following keys:

| Key | Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | Required by Beanstalk's proxy (Nginx). |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string. |
| `JWT_SECRET` | `your_secure_secret` | A long, random string for securing login tokens. |
| `NODE_ENV` | `production` | Enables production optimizations. |

### 2. Deployment Package
1. Ensure the `backend` folder contains a `package.json` and `app.js`.
2. Zip the contents of the `backend` folder (not the folder itself).
3. Upload the ZIP to the Elastic Beanstalk environment.

---

## ⚡ Frontend: AWS Amplify

Amplify is ideal for hosting React applications. It integrates directly with your GitHub repository.

### 1. Build Settings
When setting up the app in Amplify, ensure the **Build Settings** (`amplify.yml`) include the legacy OpenSSL provider, which is required by this version of `react-scripts`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - export NODE_OPTIONS=--openssl-legacy-provider
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 2. Environment Variables
In the Amplify dashboard for your app, navigate to **Environment variables** and add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `REACT_APP_API_BASE_URL` | `https://your-backend-url.aws.com` | The URL of your Elastic Beanstalk environment. |

## 📦 Storage: AWS S3 (Persistent Files)

Since Elastic Beanstalk instances are temporary, we use **AWS S3** to store question images and Excel reports.

### 1. Create an S3 Bucket
1. Log in to the **AWS Console** and go to **S3**.
2. Click **Create bucket**.
3. **Bucket name**: e.g., `online-exam-storage-mihir` (must be unique globally).
4. **Region**: Select `eu-north-1` (Stockholm) to match your backend.
5. **Object Ownership**: Select **ACLs enabled** (Required for public-read access).
6. **Block Public Access settings**: 
   - **Uncheck** "Block all public access".
   - Check the acknowledgment box that appears.
7. Click **Create bucket**.

### 2. Configure Public Access (Bucket Policy)
1. Click on your new bucket name.
2. Go to the **Permissions** tab.
3. Scroll down to **Bucket policy** and click **Edit**.
4. Paste the following policy (replace `YOUR_BUCKET_NAME` with your actual bucket name):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```
5. Click **Save changes**.

### 3. Add Environment Variables to Elastic Beanstalk
Add these additional properties in your EB **Configuration > Software** settings:

| Key | Value | Description |
| :--- | :--- | :--- |
| `AWS_REGION` | `eu-north-1` | The region of your bucket. |
| `AWS_ACCESS_KEY_ID` | `...` | Your IAM user Access Key. |
| `AWS_SECRET_ACCESS_KEY` | `...` | Your IAM user Secret Key. |
| `S3_BUCKET_NAME` | `your-bucket-name` | The name you chose in Step 1. |

---

## ✅ Post-Deployment Checklist
- [ ] Verify that the Backend health is "Green" in EB dashboard.
- [ ] Verify that you can reach the Frontend URL provided by Amplify.
- [ ] Log in with the Admin account (`admin@gmail.com`) to confirm database connectivity.
- [ ] Upload an image in a question and verify it shows up in your S3 bucket.

