import numpy as np
from PIL import Image
from pathlib import Path
from feature_extractor import FeatureExtractor

# read image database features
fe = FeatureExtractor()

features = []
img_paths = []
for feature_path in Path('./Whole_Image_Features').glob('*.npy'):
    features.append(np.load(feature_path))
    img_paths.append(Path('./Whole_Image')/(feature_path.stem + ".jpg"))
    
features = np.array(features)

class CBIRDetector:

    #  extract fiture from img
    def checkImage(self,image):
        # print("features")
        imaji = Image.open(image)
        query_features = fe.extract(imaji)
        dists = np.linalg.norm(features - query_features, axis=1)
        ids = np.argsort(dists)[:1]
        scores = [(dists[id], img_paths[id]) for id in ids]
        score = scores[0]
        if score[0] > 0 and score[0] < 0.8:
            image_path = score[1].__str__()
            print("score")
            print (score)
            print(image_path)
            return image_path
        else:
            return "not found"
    
    # check difference score for define the upper threshold
    def checkScoreDifference(self,image):
        imaji = Image.open(image)
        query_features = fe.extract(imaji)
        dists = np.linalg.norm(features - query_features, axis=1)
        ids = np.argsort(dists)[:1]
        scores = [(dists[id], img_paths[id]) for id in ids]
        score = scores[0]
        if score[0] > 0:
            difference = score[0]
            return difference
        else:
            return "not found"