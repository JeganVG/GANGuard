import cv2
import numpy as np
import torch
import albumentations as album
import os
import pandas as pd
import segmentation_models_pytorch as smp

def pred():
    class_dict = pd.read_csv("D:\\FinalContents\\label_class_dict.csv")
    # Get class names
    class_names = class_dict['name'].tolist()
    class_rgb_values = class_dict[['r','g','b']].values.tolist()


    select_classes = ['real', 'fake']
    select_class_indices = [class_names.index(cls.lower()) for cls in select_classes]
    select_class_rgb_values =  np.array(class_rgb_values)[select_class_indices]

    ENCODER = 'resnet101'
    ENCODER_WEIGHTS = 'imagenet'
    DEVICE = torch.device("cpu")
    print(DEVICE)

    # load best saved model checkpoint from the current run
    best_model = torch.load('D:\\FinalContents\\best_model.pth', map_location=DEVICE)
    print('Loaded DeepLabV3+ model from this run.') 
        
    def preprocess_image(image_path, preprocessing_fn):
        # Load the image
        image = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2RGB)
        
        # Padding
        padding_transform = album.PadIfNeeded(min_height=1536, min_width=1536, always_apply=True, border_mode=0)
        image = padding_transform(image=image)['image']
        
        # Normalization and tensor conversion
        preprocessing_transform = album.Compose([
            album.Lambda(image=preprocessing_fn),
            album.Lambda(image=to_tensor)
        ])
        preprocessed_image = preprocessing_transform(image=image)['image']
        
        return preprocessed_image

    # Define the to_tensor function
    def to_tensor(x, **kwargs):
        return x.transpose(2, 0, 1).astype('float32')

    # Center crop padded image / mask to original image dims
    def crop_image(image, target_image_dims=[1500,1500,3]):

        target_size = target_image_dims[0]
        image_size = len(image)
        padding = (image_size - target_size) // 2

        return image[
            padding:image_size - padding,
            padding:image_size - padding,
            :,
        ]
    def colour_code_segmentation(image, label_values):

        colour_codes = np.array(label_values)
        x = colour_codes[image.astype(int)]

        return x

    def reverse_one_hot(image):

        x = np.argmax(image, axis = -1)
        return x


    # Set paths and parameters
    # image_path = '/home/jegan/Semster7/FinalYear/FinalContents/Final-year-Project-master/src/uploads/realimage.jpg' 
    image_path='D:\\FinalContents\\Final-year-Project-master\\src\\uploads\\realimage.jpg' # Replace this with the path to your image
    preprocessing_fn = smp.encoders.get_preprocessing_fn(ENCODER, ENCODER_WEIGHTS)

    # Preprocess the image
    preprocessed_image = preprocess_image(image_path, preprocessing_fn)
    x_tensor = torch.from_numpy(preprocessed_image).to(DEVICE).unsqueeze(0)
    pred_mask = best_model(x_tensor)
    pred_mask = pred_mask.detach().squeeze().cpu().numpy()
    # Convert pred_mask from `CHW` format to `HWC` format
    pred_mask = np.transpose(pred_mask,(1,2,0))
    # Get prediction channel corresponding to building
    pred_building_heatmap = pred_mask[:,:,select_classes.index('fake')]
    pred_mask = crop_image(colour_code_segmentation(reverse_one_hot(pred_mask), select_class_rgb_values))
    pred_mask = pred_mask[600:900,600:900]
    print(pred_mask)
    pred_mask = pred_mask.astype(np.uint8)
    cv2.imwrite("D:\\FinalContents\\Final-year-Project-master\\src\\uploads\\detectedreg.jpg", pred_mask)
    cv2.imshow("result", pred_mask)
    cv2.waitKey(4000)
    cv2.destroyAllWindows()

pred()