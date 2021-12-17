import cv2 as cv
import numpy as np
from pathlib import Path
import random as rd
import string as strg

# The code below was adopted from roy1212 github with some minor changes 
# https://github.com/rroy1212/Image_Steganography/blob/master/ImageSteganography.ipynb

def to_bin(data):
    """Convert message to string"""
    if isinstance(data, str):
        return ''.join([ format(ord(i), "08b") for i in data ])
    elif isinstance(data, bytes) or isinstance(data, np.ndarray):
        return [ format(i, "08b") for i in data ]
    elif isinstance(data, int) or isinstance(data, np.uint8):
        return format(data, "08b")
    else:
        raise TypeError("Type not supported.")

def randomString(chars = strg.ascii_uppercase + strg.ascii_lowercase + strg.digits, N = 25):
    return ''.join(rd.choice(chars) for i in range(N))
    
def checkMaxImageBytes(image_name):
    image = cv.imread(image_name)
    n_bytes = image.shape[0] * image.shape[1] * 3 // 8
    return n_bytes

def encode(image_name, secret_data):
    # read the image
    image = cv.imread(image_name)
    # maximum bytes to encode
    n_bytes = image.shape[0] * image.shape[1] * 3 // 8
    print("[*] Maximum bytes to encode:", n_bytes)
    if len(secret_data) > n_bytes:
        raise ValueError("[!] Insufficient bytes, need bigger image or less data.")
    print("[*] Encoding data...")
    # add stopping criteria
    secret_data += "====="
    data_index = 0
    # convert data to binary
    binary_secret_data = to_bin(secret_data)
    # size of data to hide
    data_len = len(binary_secret_data)
    for row in image:
        for pixel in row:
            # convert RGB values to binary format
            r, g, b = to_bin(pixel)
            # modify the least significant bit only if there is still data to store
            if data_index < data_len:
                # least significant red pixel bit
                pixel[0] = int(r[:-1] + binary_secret_data[data_index], 2)
                data_index += 1
            if data_index < data_len:
                # least significant green pixel bit
                pixel[1] = int(g[:-1] + binary_secret_data[data_index], 2)
                data_index += 1
            if data_index < data_len:
                # least significant blue pixel bit
                pixel[2] = int(b[:-1] + binary_secret_data[data_index], 2)
                data_index += 1
            # if data is encoded, just break out of the loop
            if data_index >= data_len:
                break
    return image

def decode(image_name):
    print("[+] Decoding...")
    # read the image
    image = cv.imread(image_name)
    binary_data = ""
    for row in image:
        for pixel in row:
            r, g, b = to_bin(pixel)
            binary_data += r[-1]
            binary_data += g[-1]
            binary_data += b[-1]
    # split by 8-bits
    all_bytes = [ binary_data[i: i+8] for i in range(0, len(binary_data), 8) ]
    # convert from bits to characters
    decoded_data = ""
    for byte in all_bytes:
        decoded_data += chr(int(byte, 2))
        if decoded_data[-5:] == "=====":
            break
    return decoded_data[:-5]

if __name__ == "__main__":
    features = []
    number = 1

    # 20 bytes steganography
    for img_path in sorted(Path('../Dataset_50').glob('*.jpg')):
        input_image = str(img_path)
        output_name = input_image.split("Dataset_50\\")
        output = output_name[1].split('.')
        output = output[0]
        output_image = '../Stego_20_Bytes/' + output + '.png'
        secret_data = 'Go Beyond Plus Ultra'

        # encode the data into the image
        encoded_image = encode(image_name=input_image, secret_data=secret_data)
        # save the output image (encoded image)
        cv.imwrite(output_image, encoded_image)
    
    # proof decoded images
    for img_path in sorted(Path('../Stego_20_Bytes').glob('*.png')):
        # decode the secret data from the image
        decoded_data = decode(str(img_path))
        print("[+] Decoded data:", decoded_data)

    # 21 bytes steganography
    for img_path in sorted(Path('../Dataset_50').glob('*.jpg')):
        input_image = str(img_path)
        output_name = input_image.split("Dataset_50\\")
        output = output_name[1].split('.')
        output = output[0]
        output_image = '../Stego_21_Bytes/' + output + '.png'
        secret_data = 'Go Beyond Plus Ultras'

        # encode the data into the image
        encoded_image = encode(image_name=input_image, secret_data=secret_data)
        # save the output image (encoded image)
        cv.imwrite(output_image, encoded_image)
    
    # proof decoded images
    for img_path in sorted(Path('../Stego_21_Bytes').glob('*.png')):
        # decode the secret data from the image
        decoded_data = decode(str(img_path))
        print("[+] Decoded data:", decoded_data)

    # min bytes steganography
    for img_path in sorted(Path('../Dataset_50').glob('*.jpg')):
        input_image = str(img_path)
        output_name = input_image.split("Dataset_50\\")
        output = output_name[1].split('.')
        output = output[0]
        output_image = '../Stego_Min_Bytes/' + output + '.png'
        secret_data = "a"

        # encode the data into the image
        encoded_image = encode(image_name=input_image, secret_data=secret_data)
        # save the output image (encoded image)
        cv.imwrite(output_image, encoded_image)
    
    # proof decoded images
    for img_path in sorted(Path('../Stego_Min_Bytes').glob('*.png')):
        # decode the secret data from the image
        decoded_data = decode(str(img_path))
        print("[+] Decoded data:", decoded_data)

    # max bytes steganography
    for img_path in sorted(Path('../Dataset_50').glob('*.jpg')):
        input_image = str(img_path)
        output_name = input_image.split("Dataset_50\\")
        output = output_name[1].split('.')
        output = output[0]
        output_image = '../Stego_Max_Bytes/' + output + '.png'
        max_bytes = checkMaxImageBytes(input_image)
        secret_data = randomString(N=max_bytes)

        # encode the data into the image
        encoded_image = encode(image_name=input_image, secret_data=secret_data)
        # save the output image (encoded image)
        cv.imwrite(output_image, encoded_image)
    
    # proof decoded images
    for img_path in sorted(Path('../Stego_Max_Bytes').glob('*.png')):
        # decode the secret data from the image
        decoded_data = decode(str(img_path))
        print("[+] Decoded data:", decoded_data)