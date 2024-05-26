#!/usr/bin/python3

from models import storage

from models.user import User
from models.county import County
from models.town import Town
from models.constituency import Constituency
from models.hospital import Hospital
from models.doctor import Doctor
from models.medication import Medication

print("All users: {}".format(storage.count(User)))
print("All counties: {}".format(storage.count(County)))
print("All towns: {}".format(storage.count(Town)))
print("All constituencies: {}".format(storage.count(Constituency)))
print("All Doctors: {}".format(storage.count(Doctor)))
print("All hospitals: {}".format(storage.count(Hospital)))
print("All Medications: {}".format(storage.count(Medication)))



