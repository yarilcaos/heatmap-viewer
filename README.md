# CSV Heatmap Viewer

## Overview
This is a simple web application that allows users to upload CSV files, validate their content, and view a heatmap representation of the data. Users can also interact with the heatmap by changing the displayed metric and accessing detailed information for each data point.

## Features
- **Upload CSV Files**: Users can upload CSV files by clicking the "Choose a file" button and selecting a valid CSV file. The application will then validate the content and display either a success or failure message.
- **View Heatmap**: Once a valid CSV file is uploaded, users can navigate to the "View Heatmap" section to visualize the data in heatmap format.
- **Interact with Heatmap**: Users can interact with the heatmap by changing the displayed metric to view different representations of the data. Additionally, hovering over specific data points will reveal detailed information for each well.

## How to Use
1. **Upload a CSV File**: Click the "Choose a file" button and select a valid CSV file from your device.
2. **Validate Content**: The application will automatically validate the content of the uploaded CSV file and display a success or failure message.
3. **View Heatmap**: Once the CSV file is successfully uploaded, navigate to the "View Heatmap" section to visualize the data.
4. **Interact with Heatmap**: Explore different metrics by selecting them from the dropdown menu. Hover over data points on the heatmap to view detailed information for each well.

## Getting Started
To get started with the CSV Heatmap Viewer, simply clone this repository to your local machine and run 
npm install
npm start

alternativamente you can do 
docker run -p 3000:3000 38ea1d938656 
to run the docker file

## Getting Started
To get started with the CSV Heatmap Viewer, simply clone this repository to your local machine and open the `localhost:3000` file in a web browser. No additional setup is required.

## Technologies Used
- HTML
- CSS
- JavaScript
- React



