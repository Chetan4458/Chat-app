from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [    
    path('',views.rooms,name = "rooms"),
    # path('<int:name>/',views.display,name = 'display'),
    path('<slug:slug_val>/',views.room,name = "room"),
    # path('tp/',views.room,name = "room"),
]
