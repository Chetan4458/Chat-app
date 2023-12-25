from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Room
from django.http import HttpResponse
import threading

# Create your views here.

@login_required
def rooms(request):
    rooms = Room.objects.all()
    return render(request,'room/rooms.html',{'rooms':rooms})

@login_required
def room(request,slug_val):
# def room(request):
    # print(threading.get_native_id())
    room = Room.objects.get(slug = slug_val)
    messages = room.messages.all()[0:25]
    # return render(request,'room/room.html')
    return render(request,'room/room.html',{'room':room,'messages':messages})

# def display(request,name):
#     return HttpResponse("<h1>This is user : {}.".format(name))