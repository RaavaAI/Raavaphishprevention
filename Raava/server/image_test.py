from PIL import Image
from CBIR_Image_Processing import CBIRDetector
from SSIM_Image_Processing import SSIMDetector
import cv2 as cv
from pathlib import Path
import glob, os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

cbir = CBIRDetector()
ssim = SSIMDetector()

def detectImage(img_path):
    image = Image.open(img_path)

    image_path2 = cbir.checkImage(img_path)
    if image_path2 == "not found":
        return image_path2
    else:
        imaji = cv.imread(img_path)
        imaji2 = cv.imread(image_path2)
        # cv.imshow('Picture2', imaji2)
        # cv.imshow('Picture', imaji)
        # cv.waitKey(0)
        result = ssim.detect(img_path, image_path2)
        if result == "done":
            return "ok"
        else:
            return "no"