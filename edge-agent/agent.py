# Description: Edge agent for Vegeval
# Author: Richard Aljaste, 2023 University of Tartu

import grpc
import os
import time
import json
import shutil
import threading
import edge_agent_pb2
import edge_agent_pb2_grpc
from concurrent import futures
from minio import Minio
from dotenv import load_dotenv

class EdgeAgentServicer(edge_agent_pb2_grpc.EdgeAgentServiceServicer):
    def __init__(self, detector):
        self.detector = detector

    def StartDetection(self, request, context):
        self.detector.start()
        return edge_agent_pb2.StartDetectionResponse(success=True)

    def StopDetection(self, request, context):
        self.detector.stop()
        return edge_agent_pb2.StopDetectionResponse(success=True)

class EdgeAgentClient:
    def __init__(self, host, port, metadata):
        self.channel = grpc.insecure_channel('%s:%d' % (host, port))
        self.stub = edge_agent_pb2_grpc.EdgeAgentServiceStub(self.channel)
        self.metadata = metadata
        self.model = None
        self.status = "idle"
        self.last_message = None
        
    def setModel(self, model):
        self.model = model
        
    def setStatus(self, status):
        self.status = status
        
    def getStatus(self):
        return self.status
    
    def getLastMessageTime(self):
        return self.last_message

    def getConfig(self):
        try:
            request = edge_agent_pb2.ConfigRequest()
            response = self.stub.GetConfig(request=request, metadata=self.metadata)
        except grpc.RpcError as e:
            print(e)
            return False
        self.last_message = time.time()
        return response

    def sendHeartbeat(self):
        try:
            request = edge_agent_pb2.HeartbeatRequest(status=self.status)
            response =  self.stub.Heartbeat(request=request, metadata=self.metadata)
        except grpc.RpcError as e:
            return False
        self.last_message = time.time()
        return response

    def sendStatistics(self, data, model):
        try:
            request = edge_agent_pb2.StatisticsReportRequest(data=json.dumps(data), model=model)
            response = self.stub.StatisticsReport(request=request, metadata=self.metadata)
        except grpc.RpcError as e:
            print(e)
            return False
        self.last_message = time.time()
        return response

class Detector:
    def __init__(self, client, minio_client, config):
        from module import DetectionModel
        self.client = client
        self.minio_client = minio_client
        self.uploadRaw = config.uploadRaw
        self.model = DetectionModel()
        self.stop_event = threading.Event()

    def start(self):
        if self.client.getStatus() == "detecting":
            return
        self.detection = threading.Thread(target=self.detect, args=(self.stop_event,))
        self.detection.start()

    def detect(self, stop_event):
        stop_event.clear()
        self.client.setStatus("detecting")
        statistics = self.model.get_stats(stop_event=stop_event, source='vegeval_demo.mp4')
        for stat in statistics:
            print(stat)
            response = self.client.sendStatistics(data=stat, model=self.client.model.id)

    def stop(self):
        if self.stop_event.is_set() or self.client.getStatus() == "idle":
            return
        self.stop_event.set()
        self.client.setStatus("idle")

def main():
    load_dotenv()
    vegeval_host = os.getenv('VEGEVAL_HOST')
    vegeval_port = int(os.getenv('VEGEVAL_PORT'))
    vegeval_api_key = os.getenv('VEGEVAL_API_KEY')
    vegeval_secret_key = os.getenv('VEGEVAL_SECRET_KEY')
    minio_host = os.getenv('MINIO_HOST')
    minio_access_key = os.getenv('MINIO_ACCESS_KEY')
    minio_secret_key = os.getenv('MINIO_SECRET_KEY')
    metadata = [
        ('x-api-key', vegeval_api_key),
        ('x-api-secret', vegeval_secret_key)
    ]

    try:
        client = EdgeAgentClient(
            host=vegeval_host, port=vegeval_port, metadata=metadata)
        config = client.getConfig()
    except Exception as e:
        print("Unable to connect to Vegeval gRPC server!")
        print(e)

    if config:
        client.setModel(config.model)
        minio_client = Minio(
            endpoint=minio_host,
            region='eu-east',
            secure=True,
            access_key=minio_access_key,
            secret_key=minio_secret_key,
        )
        
        if os.path.isdir('./module'):
            # Remove existing module
            shutil.rmtree('./module', ignore_errors=True)
        try:
            if (not os.path.isfile('./modules/' + config.model.objectName)):
                # Download model module
                minio_client.fget_object(
                    'vegeval.models', config.model.objectName, './modules/' + config.model.objectName)
            # Unpack model module
            os.system('unzip -qq ./modules/' + config.model.objectName + ' -d ./module')
        except Exception as e:
            print('Failed to download and unpack model module!')
            print(e)
            exit(1)

        detector = Detector(client, minio_client, config)

        server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
        edge_agent_pb2_grpc.add_EdgeAgentServiceServicer_to_server(
            EdgeAgentServicer(detector), server)
        server.add_insecure_port('[::]:20048')
        server.start()

        print('Edge agent started.')

        try:
            while True:
                last_message_time = client.getLastMessageTime()
                if (last_message_time == None or time.time() - last_message_time >= 5):
                    client.sendHeartbeat()
                    time.sleep(5)
                else:
                    time.sleep(5 - (time.time() - last_message_time))
        except KeyboardInterrupt:
            server.stop(0)
    else:
        print('Failed to get config!')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(e)
