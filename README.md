# Kursi Classifier

Kursi Classifier is a React application that allows users to upload images and automatically classifies them into three categories: **Transparent**, **Black**, or **Colorful** based on the image's brightness and color composition.

## Features

- Drag & drop or click to upload an image.
- Real-time image analysis using canvas pixel data.
- Classification based on average brightness and dominant color grouping.
- Displays the uploaded image under the relevant category.
- Option to reset and analyze new images.
- Clean, responsive UI with a purple-themed hero banner.

## How It Works

1. **Image Upload:** Users upload an image via drag-and-drop or file selector.
2. **Pixel Analysis:** The image is drawn onto an off-screen canvas to extract pixel data.
3. **Brightness Calculation:** Average brightness of visible (non-transparent) pixels is calculated.
4. **Color Grouping:** Pixels are grouped by color bins to determine dominant colors.
5. **Classification Logic:**
    - If average brightness > 200 → classified as **Transparent**.
    - If average brightness < 60 → classified as **Black**.
    - Otherwise, if a single color dominates more than 70% pixels → classified as **Black**.
    - Else, classified as **Colorful**.

## Usage
Upload an image using drag-and-drop or click to select a file.
Wait for the analysis to complete.
View the classification result under the respective category.
Click Try Another Image to reset and upload a new image.

## Technologies Used
React
React Dropzone
HTML5 Canvas API
CSS for styling

## Folder Structure
/src
  /components
    ImageUploader.js
    CategoryDisplay.js
  App.js
  App.css
  index.js
