from django import forms


class SearchForm(forms.Form):
    add = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['add'].label = ""
