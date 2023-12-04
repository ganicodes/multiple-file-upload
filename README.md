# Project Name

A simple React project using Vite, react-dropzone, and react-toastify for uploading multiple files.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Description

This project is a minimalistic React application created with Vite that allows users to upload multiple files using the `react-dropzone` library. The user-friendly interface is enhanced with `react-toastify` to provide feedback on file upload status.

## Features

- Upload multiple files at once
- Real-time feedback using `react-toastify`
- Lightweight and fast with Vite

## Installation

1. **Clone Repository:**

   ```bash
   git clone https://github.com/your-username/your-project.git

2. **Navigate to Project Directory:**

   ```bash
   cd your-project

3. **Install Dependencies:**
   ```bash
   yarn

## Usage
1. **Start the development server:**
   ```bash
   yarn dev
  This will start the development server. Open your browser and go to http://localhost:5173 to view the app.

2. **Upload files:**
 - Drag and drop files into the designated area.
 - Click on the designated area to open the file dialog and select files.

3. **File Upload Status:**
- File upload status will be displayed using react-toastify notifications.
- Currently the upload function is mock but you can add your upload API call there in order to upload the files for server / cloud (using Cloudinary, Firebase Storage or Amazaon S3 bucket). 
