import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Message,Room
from django.contrib.auth.models import User


class Chatconsumer(WebsocketConsumer):
    def connect(self):
        url = self.scope['path'] #Got the url of present room
        url = url.split('/')
        while "" in url:
            url.remove("")  
        print(url)     # Splittin it to get slug value since slug == room name
        self.room_group_name = url[-1]

        async_to_sync(self.channel_layer.group_add)(    #Adding channel to group
           self.room_group_name,
           self.channel_name 
        )

        self.accept()
        
        # group_name = 
        # self.send(text_data = json.dumps({            # text_data is a keyword
        #     'message':"This is an important msg",
        #     'type': 'Data is sent to front end/client side'
        # }))
    def receive(self,text_data):
        # print("Nuahaha")
        text_data = json.loads(text_data)
        # print(text_data_json)
        message = text_data['message']
        username = text_data['username']
        room = text_data['room']

        room_obj = Room.objects.filter(slug=room)[0]
        user_obj = User.objects.filter(username=username)[0]
        ins = Message(room=room_obj,user=user_obj,content=message)
        ins.save()
        # print(message)
        # self.send(text_data = json.dumps({
        #     'type' : 'chat' , #To identify if message is coming from frontend
        #     'message' : message
        # }))
        async_to_sync(self.channel_layer.group_send)(  # Braodcatsing method
            self.room_group_name,
            {
                'type' : 'chat_message',  # Function to sending messages to front end
                'message' : message,  #Event
                'username' : username,
                'room' : room
            }
        )
    def chat_message(self,event):
        message = event['message']      #Getting message from event
        username = event['username']
        room = event['room']
        self.send(text_data = json.dumps({
            'type' : 'chat',
            'message' : message,
            'username' : username,
            'room' : room
        }))
