from provider.models import Provider

from django import forms


class ProviderForm(forms.ModelForm):
    reseller = forms.ModelChoiceField(
        queryset = Provider.objects.exclude(is_service=True).exclude(is_local=True),
        required = False
    )

    class Meta:
        model = Provider
        fields = ['name', 'users_in_charge', 'reseller', 'notes', 'is_local', 'is_service', 'direct_reception']

    def __init__(self, user, *args, **kwargs):
        super(ProviderForm, self).__init__(*args, **kwargs)

        if not user.has_perm('team.custom_is_admin'):
            del self.fields['is_local']
