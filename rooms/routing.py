from django.urls import path
from .consumers import Chatconsumer

ws_urlpatterns = [    
    path(r'ws/<slug:room_slug>/',Chatconsumer.as_asgi()),
]
