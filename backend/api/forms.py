from django import forms

class ImageForm(forms.Form):
    path = forms.FileField()