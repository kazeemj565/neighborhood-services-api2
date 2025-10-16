from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email',
            'first_name', 'last_name',
            'gender', 'religion', 'language', 'bio'
        ]
        read_only_fields = ['username', 'email']

    def normalize_string_field(self, value, field_name=None, valid_choices=None):
        """Normalize and validate string fields."""
        if not isinstance(value, str):
            return value
        normalized = value.strip().lower()
        if valid_choices and normalized not in valid_choices:
            raise serializers.ValidationError(
                f"Invalid {field_name}. Must be one of: {', '.join(valid_choices)}"
            )
        return normalized

    def update(self, instance, validated_data):
        # Normalize string-based fields
        if 'gender' in validated_data:
            validated_data['gender'] = self.normalize_string_field(
                validated_data['gender'], field_name='gender',
                valid_choices=['male', 'female', 'other']
            )
        if 'language' in validated_data:
            validated_data['language'] = self.normalize_string_field(validated_data['language'])
        if 'religion' in validated_data:
            validated_data['religion'] = self.normalize_string_field(validated_data['religion'])

        # Update normal user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError('Invalid credentials')
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }



