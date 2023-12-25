"""
ASGI config for chatproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from rooms.routing import ws_urlpatterns

# print(ws_urlpatterns)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatproject.settings')

application = ProtocolTypeRouter({        # ProtocolTypeRouter used to check the type of protocol(http/websocket(ws)) 
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(     # AuthMiddlewareStack used to check if user is authenticated 
        URLRouter(ws_urlpatterns)         # or not before accessing the following urls
    ),
})
