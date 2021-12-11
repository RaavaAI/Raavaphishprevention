import server_featureextractor
import joblib
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import numpy as py
import image_test
import cv2 as cv

app = Flask(__name__, template_folder='template')
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
treeModel = joblib.load("./Model/decision_tree")
forestModel = joblib.load("./Model/random_forest")
svm = joblib.load("./Model/svm")

fe = server_featureextractor
it = image_test

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        emailProvider = request.args.get('a')
        urlDetected = request.args.get('b')
        image = ".."+ request.args.get('c')

        feature_names = ['Have_IP', 'Have_At', 'URL_Length', 'URL_Depth', 'Redirection', 'https_Domain', 'Shortened', 'Prefix/Suffix', 
                    'Sub-domain', 'DNS_Record', 'Number_of_Param', 'Number_of_Period',  'Web_Traffic', 'StatusBar_Costumized', 
                    'Forward','SSL', 'Iframe_Redirect', 'Domain_Age']

        feature1 = []
        feature1.append(fe.featureExtractor(emailProvider))
        extractedFeatures1 = pd.DataFrame(feature1, columns=feature_names)
        # print(extractedFeatures1)
        feature2 = []
        feature2.append(fe.featureExtractor(urlDetected))
        extractedFeatures2 = pd.DataFrame(feature2, columns=feature_names)
        # print(extractedFeatures2)

        result1a = treeModel.predict(extractedFeatures1)
        print(result1a)
        result2a = forestModel.predict(extractedFeatures1)
        print(result2a)
        result3a = svm.predict(extractedFeatures1)
        print(result3a)

        email = None
        if result1a[0]+result2a[0]+result3a[0] < 2:
            print("it has trusted email")
            email = "legitimate"
        elif result1a[0]+result2a[0]+result3a[0] >=2 :
            print("it has untrusted email")
            email = "phishing"

        result1b = treeModel.predict(extractedFeatures2)
        print(result1b)
        result2b = forestModel.predict(extractedFeatures2)
        print(result2b)
        result3b = svm.predict(extractedFeatures2)
        print(result3b)

        url = None
        if result1b[0]+result2b[0]+result3b[0] < 2:
            print("it has legitimate url")
            url = "legitimate"
        elif result1b[0]+result2b[0]+result3b[0] >=2 :
            print("it has phishing url")
            url = "phishing"

        # print(image)
        # images = cv.imread(str(image))
        # cv.imshow('Image', images)
        # cv.waitKey(0)
        detectImage = it.detectImage(str(image))
        print(detectImage)

        response = jsonify({'email':email, 'url':url, 'image':detectImage})
        return response

if __name__ == '__main__':
    app.run(debug=True)