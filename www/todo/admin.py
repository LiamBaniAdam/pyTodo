from django.contrib import admin
from .models import Tasks


class TasksAdmin(admin.ModelAdmin):
    list_display = ['name','isChecked','creationTime']
admin.site.register(Tasks, TasksAdmin)