from ultralytics import YOLO
from queue import Queue
import threading
import time

class DetectionModel:
    def __init__(self):
        # Load the YOLOv8n model
        self.model = YOLO(task='detect', model='module/yolov8n_edgetpu.tflite')
        self.queue = Queue()
        self.names = ['StandardQ', 'LowQ', 'MediumQ']
        self.weights = [1, 1.5, 1.25]
        self.status = "idle"

    # Detects objects in a video stream
    # source: video file name (optional), otherwise defaults to webcam feed
    # conf: confidence threshold (default: 0.35)
    # iou: intersection over union threshold (default: 0.4)
    # returns: a stream of detections
    def detect(self, stop_event, source, conf=0.35, iou=0.4):
        # Run inference
        #last_frame = time.time()
        if source:
            detections = self.model.track(task='detect', source=source, conf=conf, iou=iou, stream=True, verbose=False)
        else:
            detections = self.model.track(task='detect', source=0, conf=conf, iou=iou, stream=True, verbose=False)
        
        for detection in detections:
            if stop_event.is_set():
                return
            #fps = round(1 / (time.time() - last_frame), 2)
            objects = {}
            boxes = detection.boxes
            if boxes.is_track:
                for box in boxes:
                    id = int(box.id)
                    cls = int(box.cls)
                    conf = float(box.conf)
                    
                    objects[id] = {'cls': cls, 'conf': conf}
            self.queue.put(objects)
            #last_frame = time.time()
        return
    
    # Get statistics from the detection model
    # source: video file name (optional, used for the purpose of the demo), otherwise defaults to webcam feed
    # returns: a stream of statistics
    def get_stats(self, stop_event, source='vegeval_demo.mp4'):
        self.detection = threading.Thread(target=self.detect, args=(stop_event, source,))
        self.detection.start()
        buffer = {}
        while self.detection.is_alive() or not self.queue.empty():
            objects = self.queue.get()
            end = not self.detection.is_alive() and self.queue.empty()
            stats = []
            for key, o in objects.items():
                conf = o['conf']
                cls = o['cls']
                if key in buffer:
                    buffer[key]['confs'][cls] += conf * self.weights[cls]
                    buffer[key]['frames'] += 1
                else:
                    confs = [0, 0, 0]
                    confs[cls] = conf
                    buffer[key] = {'confs': confs, 'frames': 1, 'frames_since_last': 0}
  
            # Remove objects that have not been detected for 10 frames, generate statistics from rest
            for key, o in buffer.copy().items():
                if key not in objects:
                    buffer[key]['frames_since_last'] += 1
                if o['frames_since_last'] >= 10 or end:
                    if o['frames'] >=10:
                        highest_class = o['confs'].index(max(o['confs']))
                        stats.append({'id': key, 'cls_id': highest_class, 'cls_name': self.names[highest_class], 'confs': o['confs'], 'frames': o['frames'], 'timestamp': time.time()})
                    buffer.pop(key)
            if len(stats) > 0:
                yield stats