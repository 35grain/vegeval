import cv2, time, os
from threading import Thread
from datetime import datetime


class VideoFeed(object):
    def __init__(self, src=0, fps=60, resolution=(1920, 1080)):
        self.capture = cv2.VideoCapture(src)
        self.capture.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('M', 'J', 'P', 'G'))
        self.capture.set(cv2.CAP_PROP_BUFFERSIZE, 2)
        self.capture.set(cv2.CAP_PROP_FPS, fps)
        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, resolution[0])
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, resolution[1])
        self.capture.set(cv2.CAP_PROP_AUTOFOCUS, 0)  # Disable autofocus
        # Sets focus approx. 1 m from camera
        self.capture.set(cv2.CAP_PROP_FOCUS, 25)

        # Start the thread to read frames from the video stream
        self.thread = Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()

    def update(self):
        # Read the next frame from the stream in a different thread
        while True:
            if self.capture.isOpened():
                (self.status, self.frame) = self.capture.read()
            else:
                print("Unable to capture frame. Aborting!")
                exit(1)

    def get_frame(self):
        self.status = False
        return self.frame

    def get_status(self):
        return self.status


class ImageWriter(object):
    def __init__(self, fps=60):
        self.queue = []
        self.fps = fps
        self.thread = Thread(target=self.write, args=())
        self.thread.daemon = True
        self.thread.start()

    def add_to_queue(self, path, image):
        self.queue.append((path, image))

    def write(self):
        while True:
            if len(self.queue):
                item = self.queue.pop(0)
                cv2.imwrite(item[0], item[1])
            else:
                time.sleep(1 / self.fps * 1000)


if __name__ == '__main__':
    video_feed = VideoFeed(fps=30, resolution=(1280, 720))
    image_writer = ImageWriter(fps=30)
    motion_bg = None
    last_frame = None
    last_motion = time.time()
    date = datetime.now().strftime("%d.%m.%y")
    path = "/media/usb_sony/train_capture/" + date + "/"

    # If dated directory does not exist, create it
    if not os.path.exists(path):
        os.mkdir(path)

    frame_no = 0
    while True:
        try:
            if video_feed.get_status():
                frame = video_feed.get_frame()
                motion = False

                frame_change = cv2.GaussianBlur(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), (21, 21), 0)
                if frame_no % 5 == 0:
                    motion_bg = frame_change
                    #if last_frame is not None:
                    #    print("Avg FPS: ", 5 / (time.time() - last_frame))
                    #last_frame = time.time()

                frame_diff = cv2.absdiff(motion_bg, frame_change)
                frame_threshold = cv2.dilate(cv2.threshold(frame_diff, 20, 255, cv2.THRESH_BINARY)[1], None, iterations=2)

                contours, _ = cv2.findContours(frame_threshold.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                for contour in contours:
                    if cv2.contourArea(contour) >= 5000:
                    	motion = True
                    	break  # remove if wanting to draw rectangles

                    # (cont_x, cont_y,cont_w, cont_h) = cv2.boundingRect(contour)
                    # cv2.rectangle(frame, (cont_x, cont_y), (cont_x + cont_w, cont_y + cont_h), (0, 255, 0), 3)

                if motion:
                    # If motion was detected, add the frame to write queue
                    image_writer.add_to_queue(path + str(time.time()) + '.jpg', frame)
                    last_motion = time.time()
                elif (time.time() - last_motion) / 60 >= 5:
                    print("5 minutes elapsed since last detected motion. Shutting down!")
                    time.sleep(5)
                    # Shut system down if not motion has been detected for >= 5 minutes
                    os.system("shutdown now -h")

                frame_no += 1
        except AttributeError:
            pass
