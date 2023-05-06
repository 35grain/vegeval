from label_studio_ml.model import LabelStudioMLBase
import requests, torch
from PIL import Image
from io import BytesIO
import pandas as pd

LS_URL = ""
LS_API_TOKEN = ""

class YOLOv5Model(LabelStudioMLBase):
    def __init__(self, **kwargs):
        # Call base class constructor
        super(YOLOv5Model, self).__init__(**kwargs)

        from_name, schema = list(self.parsed_label_config.items())[0]
        self.from_name = from_name
        self.to_name = schema['to_name'][0]
        self.model = torch.hub.load('ultralytics/yolov5', 'custom', 'best.pt')

    def predict(self, tasks, **kwargs):
        """ This is where inference happens: model returns 
            the list of predictions based on input list of tasks 
        """
        task = tasks[0]

        predictions = []
        score = 0

        header = {
            "Authorization": "Token " + LS_API_TOKEN}
        image = Image.open(BytesIO(requests.get(
            LS_URL + task['data']['image'], headers=header).content))
        original_width, original_height = image.size
        results = self.model(image).pandas().xyxy[0]

        for i, prediction in results.iterrows():
            predictions.append({
                'from_name': self.from_name,
                'to_name': self.to_name,
                'type': 'rectanglelabels',
                'score': prediction['confidence'],
                'original_width': original_width,
                'original_height': original_height,
                'image_rotation': 0,
                'value': {
                    "rotation": 0,
                    "x": prediction['xmin'] / original_width * 100, 
                    "y": prediction['ymin'] / original_height * 100,
                    "width": (prediction['xmax'] - prediction['xmin']) / original_width * 100,
                    "height": (prediction['ymax'] - prediction['ymin']) / original_height * 100,
                    "rectanglelabels": [prediction['name']]
                }
            })
            score += prediction['confidence']
            
        return [{
            'result': predictions,
            'score': score / (i + 1),
            'model_version': 'v1',  # all predictions will be differentiated by model version
        }]
