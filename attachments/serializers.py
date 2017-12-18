from rest_framework import serializers

from .models import Attachment


class AttachmentSerializer(serializers.ModelSerializer):
    """
    Attachment serialization.
    """

    class Meta:
        model = Attachment
        fields = [
            'filename',
            'attached_file',
            'object_id',
        ]
