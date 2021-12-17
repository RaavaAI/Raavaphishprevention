# import the library
from skimage.metrics import structural_similarity as compare_ssim
import imutils
import cv2 as cv

class SSIMDetector:

    def rescaleImage(self, frame, scale=None):
        width = 500
        height = 500
        dimensions = (width, height)

        return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)

    def detect(self, path1, path2):
        # load images
        imageA = cv.imread(path1)
        imageB = cv.imread(path2)

        # resize the image
        resizedA = self.rescaleImage(imageA)
        resizedB = self.rescaleImage(imageB)

        # grayscale
        grayA = cv.cvtColor(resizedA, cv.COLOR_BGR2GRAY)
        grayB = cv.cvtColor(resizedB, cv.COLOR_BGR2GRAY)

        #  compute the SSIM
        (score, diff) = compare_ssim(grayA, grayB, full=True)
        diff = (diff *255).astype("uint8")
        print("SSIM: {}".format(score))

        #  threshold 
        thresh = cv.threshold(diff, 0,255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]
        cnts = cv.findContours(thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)

        # loop over the contours
        for c in cnts:
            (x,y,w,h) = cv.boundingRect(c)
            cv.rectangle(resizedA, (x,y), (x+w, y+h), (0,0,255),2)
            cv.rectangle(resizedB, (x,y), (x+w, y+h), (0,0,255),2)

        cv.imwrite('../img/fake.jpg', resizedA)
        cv.imwrite('../img/real.jpg', resizedB)
        # cv.imshow('Fake', resizedA)
        # cv.imshow('Original', resizedB)
        # cv.imshow('thresh', thresh)
        # cv.imshow('diff', diff)
        cv.waitKey(0)
        return "done"

