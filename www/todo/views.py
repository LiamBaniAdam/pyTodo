from django import views
from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q

from todo.models import Tasks
from .forms import SearchForm

# Create your views here.


def show(request):
    tasks = Tasks.objects.all()
    form = SearchForm
    if 'add' in request.GET:
        form = SearchForm(request.GET)
        if form.is_valid():
            clnD = form.cleaned_data['add']
            task = Tasks(name=clnD, isChecked=False)
            task.save()
    return render(request, "todo/index.html", {'todos': tasks, 'form': form})


class TodoDelete(views.View):
    def get(self, request):
        idTodo = request.GET.get('id', None)
        Tasks.objects.get(id=idTodo).delete()
        data = {
            'deleted': True
        }
        return JsonResponse(data)
