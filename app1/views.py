from http.client import HTTPResponse
from django.shortcuts import render,redirect
from .forms import SignUpForm
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required

# Create your views here.
def frontpage(request):
    return render(request,'core/frontpage.html')

def signup(request):
    if request.method == "POST":         #Check if the request is POST request             
        form = SignUpForm(request.POST)  #Send all paramenters to form for future validation
        # print(request.POST.get('username'))
        # print(request.POST.get('password1'))
        # print(request.POST.get('password2'))

        if form.is_valid():              #Process the form to Check if parameters are valid
            user = form.save()
            # print("valid form")
            # login(request,user)
            return redirect('rooms')
        else:
            print(form.errors.as_data())        

    else:
        form = SignUpForm()    

    return render(request,'core/signup.html',{'form':form})

def loginuser(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password1']
        # print(username,password)
        user = authenticate(username = username,password = password)
        # print(request.user.is_authenticated)
        if user is not None:
            login(request,user)
            # print(request.user.is_authenticated)
            return redirect('rooms')
        else:
            return render(request,'core/login.html')


    return render(request,'core/login.html')
    
def logoutuser(request):
    logout(request)
    return redirect('frontpage')

# @login_required
# def rooms(request):
#     return render(request,'core/rooms.html')




    