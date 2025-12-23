# EYJA-BaruchTBT (Textbook Trading Platform)

A full-stack web application for Baruch College students to trade textbooks, consisting of a React frontend and a serverless Node.js backend (AWS Lambda).

## 🛠 Tech Stack

- **Frontend**: React, Vite, Bootstrap, Supabase (Auth & Storage)
- **Backend**: Node.js, Express (Serverless via AWS Lambda)
- **Database**: Supabase / RDS (PostgreSQL/MySQL)
- **Infrastructure**: AWS SAM (Serverless Application Model), API Gateway, S3, CloudFront

## 🚀 Prerequisites

Ensure you have the following installed:
- Node.js (v18+)
- AWS CLI (configured with credentials)
- AWS SAM CLI

## 💻 Local Development

### 1. Backend (Local Server)
We run the Express app locally on port 8000 to mimic the cloud environment.

```bash
cd src
# Install dependencies (first time only)
npm install
# Start local server
npm start
```
*Port: `http://localhost:8000`*

### 2. Frontend (Dev Server)
The frontend automatically detects it is in `dev` mode and connects to `localhost:8000`.

```bash
cd Front-End
# Install dependencies (first time only)
npm install
# Start vite dev server
npm run dev
```
*Port: `http://localhost:5173`*

---

## ☁️ Deployment Guide

### 1. Backend (Infrastructure & Lambda)
Deploys the `template.yaml` configuration to AWS.

```bash
# In the project root
sam build
sam deploy
```
*Note: This updates API Gateway, Lambda functions, and CORS configurations.*

### 2. Frontend (Static Assets)
Builds the React app and syncs it to the S3 bucket.

1.  **Build** the project:
    ```bash
    cd Front-End
    npm run build
    cd ..
    ```

2.  **Upload** to S3:
    *Look for `BucketName` in the "Outputs" section after `sam deploy`.*
    
    ```bash
    aws s3 sync Front-End/dist s3://<YOUR_BUCKET_NAME>
    ```
    *Example: `aws s3 sync Front-End/dist s3://baruchtbt-5-staticwebsitebucket-xxxxxx`*

## 🔒 Configuration

- **Environment Variables**: 
  - Ensure `.env` files (in `src/` and `Front-End/`) are configured with your Supabase keys and DB credentials. 
  - **Do not commit `.env` files to Git.**

## 🔍 Troubleshooting

- **CORS Errors**: If you add new HTTP methods (e.g., PATCH), update `template.yaml` -> `CorsConfiguration` and run `sam deploy`.
- **API URL switching**: logic is handled in `Front-End/src/api.jsx` using `import.meta.env.DEV`.
