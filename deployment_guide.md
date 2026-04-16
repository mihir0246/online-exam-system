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

---

## 📁 File Storage Note

> [!WARNING]
> **Persistent Storage**: Currently, the system saves Excel result files to the local `public/result` directory. Elastic Beanstalk instances are **ephemeral**, meaning files saved there will be lost when the server restarts or scales.
> 
> **Recommendation**: For production, consider integrating **AWS S3** for permanent file storage if you need to keep these results indefinitely.

---

## ✅ Post-Deployment Checklist
- [ ] Verify that the Backend health is "Green" in EB dashboard.
- [ ] Verify that you can reach the Frontend URL provided by Amplify.
- [ ] Log in with the Admin account (`admin@gmail.com`) to confirm database connectivity.
