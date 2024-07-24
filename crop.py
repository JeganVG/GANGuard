import cv2
image = cv2.imread('/home/jegan/Semster7/FinalYear/stargan-master/stargan_celeba_128/results/4-images.jpg')
print(image.shape)
#cropfirst
count=49
# for i in range(0,16):
#         crop_image = image[i*256:(i+1)*256, 0:256]
#         cv2.imshow("cropped", crop_image)
#         cv2.imwrite("/home/jegan/Semster7/FinalYearProject/outputs/star1fake/"+str(count)+"/"+str(count)+".jpg",crop_image)
#         cv2.waitKey(1000)
#         count+=1
# import cv2
# image = cv2.imread('/home/jegan/Semster7/FinalYear/stargan-master/stargan_celeba_128/results/2-images.jpg')
# print(image.shape)
for i in range(0,16):
    for j in range(0,5):
        crop_image = image[i*256:(i+1)*256, (j+1)*256:(j+2)*256]
        cv2.imshow("cropped", crop_image)
        cv2.imwrite("/home/jegan/Semster7/FinalYearProject/outputs/star1fake/"+str(count)+"/"+str(count)+str(j)+".jpg",crop_image)
        cv2.waitKey(1000)
    count+=1    
# cv2.imwrite("crop"+i, crop_image)
# import os
# import cv2
# dir = os.listdir("/home/jegan/Semster7/FinalYearProject/outputs/star1fake")
# print(dir)