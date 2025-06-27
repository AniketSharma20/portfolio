from django.shortcuts import render
from django.http  import HttpResponse
from django.contrib import messages
from myapp.models import Contact


# Create your views here.
def home(request):
    # form = MyForm()
    return render(request, 'myapp/index.html', )
    

def contact(request):
    if request.method=="POST":
       print('post')
       name=request.POST.get('name')
       email=request.POST.get('email')
       number=request.POST.get('number')
       content=request.POST.get('content')
       print(name,email,number,content)
       if len(name)>1 and len(name)<30:
           pass
       else:
           messages.error(request,'lenght of name should be greater than 2 and less than 30 words')
           return render(request,'index.html')
       if len(email)>1 and len(email)<30:
           pass
       else:
           messages.error(request,'invalid email try again')
           return render(request,'index.html')
       if len(email)>2 and len(email)<13:
           pass
       else:
           messages.error(request,'invalid email try again')
           return render(request,'index.html')
       ins=contact(name=name,email=email,content=content,number=number)
       ins.save()
       messages.success(request,'thank you for contactung me|| your message have been save')
       print('data has been saved to data base')
       print('the request is no pass ')
       return render(request,'index.html')