import cv2
image = cv2.imread("D:\\FinalContents\\Final-year-project-backend-master\\output\\256_shortcut1_inject1_none_hq\\custom_testing\\jegan.jpg")
print(image.shape)
height, width, _ = image.shape

num_splits = 15
split_width = width // num_splits

x_start = 0

print("splitting image")
# Loop through each split
for i in range(num_splits):
    # Calculate the ending x-coordinate for the split
    x_end = x_start + split_width
    
    # Extract the split from the original image
    split = image[:, x_start:x_end, :]
    
    # Save the split image
    cv2.imwrite(f'D:\\FinalContents\\paper-kit-react-main\\src\\assets\\Result\\att_test_{i}.jpg', split)
    
    # Update the starting x-coordinate for the next split
    x_start = x_end