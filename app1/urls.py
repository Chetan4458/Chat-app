from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.frontpage,name = "frontpage"),
    path('signup/',views.signup,name = "signup"),
    # path('rooms/',views.rooms,name = "rooms"),
    path('logout/',views.logoutuser,name = "logout"),
    path('login/',views.loginuser,name = 'login')
]
