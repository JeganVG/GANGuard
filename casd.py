import os
dir = os.listdir("/home/jegan/Semster7/FinalYearProject/outputs/star1fake")
print(dir)
for i in dir:
    old_file = os.path.join("/home/jegan/Semster7/FinalYearProject/outputs/star1fake", i)
    new_file = os.path.join("/home/jegan/Semster7/FinalYearProject/outputs/star1fake", str(int(i)+16))
    os.rename(old_file, new_file)