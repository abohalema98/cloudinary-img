# Cloudinary Image Upload App

This is a Node.js application that allows users to upload images to Cloudinary using the Express framework and Multer for file upload.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- Cloudinary account with API credentials
- Create a `.env` file in the project root and add your Cloudinary API credentials:

```
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/cloudinary-image-upload.git
```

2. Navigate to the project directory:

```
cd cloudinary-image-upload
```

3. Install the dependencies:

```
npm install
```

## Usage

1. Start the server:

```
npm start
```

2. Open your web browser and go to `http://localhost:3000` to access the app.

3. Click on the "Choose File" button to select an image for upload.

4. Click the "Upload" button to upload the selected image to Cloudinary.

## Features

- File upload using Multer
- Integration with Cloudinary for image storage
- Express.js server for handling requests


