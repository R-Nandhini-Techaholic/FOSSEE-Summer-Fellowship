import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "workshop_portal.settings")
django.setup()

from django.contrib.auth.models import Group, Permission

instructor_group, created = Group.objects.get_or_create(name='instructor')
if created:
    all_perms = Permission.objects.all()
    instructor_group.permissions.set(all_perms)
    print("Instructor group created with all permissions.")
else:
    print("Instructor group already exists.")
