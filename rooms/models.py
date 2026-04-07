from django.db import models

class Room(models.Model):
    ROOM_TYPES = [
        ('SNG', 'Simple'),
        ('DBL', 'Doble'),
        ('SUT', 'Suite'),
    ]
    
    number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=3, choices=ROOM_TYPES, default='SNG')
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Habitación {self.number} - {self.get_room_type_display()}"