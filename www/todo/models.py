from django.db import models

# Create your models here.
class Tasks(models.Model):
    name = models.CharField(max_length=50)
    isChecked = models.BooleanField("Is Checked")
    creationTime = models.DateTimeField("Date created",auto_now_add=True)
    UpdateTime = models.DateTimeField("Date updated",auto_now=True)

    class Meta:
        verbose_name_plural = "Tasks"

    def __str__(self):
        return self.name