# GAN-Guard Project Summary

## Overview
GAN-Guard is a specialized Deep Learning system designed to detect and localize GAN-generated manipulation in images (DeepFakes). Unlike traditional binary classifiers that simply flag an image as "Fake" or "Real," GAN-Guard utilizes Semantic Segmentation to pinpoint the exact regions of an image that have been artificially generated or modified.

## Core Technology
*   **Architecture**: DeepLabV3+ with a ResNet101 encoder.
*   **Method**: Semantic Segmentation.
*   **Classes**: 'Real' vs 'Fake'.
*   **Frameworks**: PyTorch, Segmentation Models PyTorch (SMP).

## Workflow
1.  **Input**: User uploads an image via the web interface.
2.  **Processing**: The Node.js backend saves the image and triggers the Python inference engine.
3.  **Inference**:
    *   The image is preprocessed (padded to 1536x1536).
    *   The Pre-trained DeepLabV3+ model scans the image.
    *   It generates a pixel-wise mask identifying "Fake" regions.
4.  **Output**: A highlighted image showing the manipulated areas is generated and correctly identified as containing GAN artifacts.

## System Components
1.  **Backend API**: A Node.js and Express server that manages file uploads and communicates with the Python engine.
2.  **Inference Engine**: A Python script utilizing PyTorch to load the heavyweight detection model and perform inference.
3.  **Database**: MongoDB is used for user authentication and logs.
