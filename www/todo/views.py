from django import views
from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q

from todo.models import Tasks
from .forms import AddForm

# Create your views here.


def show(request):
    tasks = Tasks.objects.all()
    form = AddForm
    return render(request, "todo/index.html", {'todos': tasks, 'form': form})


class TodoDelete(views.View):
    def get(self, request):
        idTodo = request.GET.get('id', None)
        Tasks.objects.get(id=idTodo).delete()
        data = {
            'deleted': True
        }
        return JsonResponse(data)


class TodoAdd(views.View):
    def get(self, request):
        if 'add' in request.GET:
            form = AddForm(request.GET)
            if form.is_valid():
                cd = form.cleaned_data['add']
                print(cd)
                obj = Tasks.objects.create(name=cd, isChecked=False)

        added = {
            'id': obj.id,
            'name': obj.name,
            'isChecked': obj.isChecked
        }
        data = {
            'added': added
        }
        return JsonResponse(data)


class TodoEdit(views.View):
    def get(self, request):
        idTodo = request.GET.get('id', None)
        status = request.GET.get('status', None)
        Tasks.objects.filter(id=idTodo).update(isChecked=status)
        data = {
            'edited': status
        }
        return JsonResponse(data)
