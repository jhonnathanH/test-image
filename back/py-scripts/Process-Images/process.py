import cv2
import numpy as np
import requests
import sys
import json

def analyze_image(url):
    try:
        resp = requests.get(url, stream=True).raw
        image = np.asarray(bytearray(resp.read()), dtype="uint8")
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)

        if img is None:
            return {"error": "No se pudo decodificar la imagen"}
        # get dimensions
        height, width, _ = img.shape

        # get RGB avg
        avg_color_per_row = np.average(img, axis=0)
        avg_color = np.average(avg_color_per_row, axis=0)
        # get avg color in RGB format
        rgb_color = {
            "r": int(avg_color[2]),
            "g": int(avg_color[1]),
            "b": int(avg_color[0])
        }

        result = {
            "width": width,
            "height": height,
            "dominant_rgb": rgb_color,
            "aspect_ratio": round(width / height, 2)
        }
        return result

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    image_url = sys.argv[1]
    analysis = analyze_image(image_url)
    print(json.dumps(analysis))