#!/usr/bin/python3
from models import storage
from models.base_model import BaseModel
from models.user import User

all_objs = storage.all()
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

print("-- Create a new User --")
my_user = User()
my_user.first_name = "Betty"
my_user.last_name = "Bar"
my_user.email = "airbnb@mail.com"
my_user.password = "root"
my_user.date_of_birth = "2002/02/09"
my_user.save()
print(my_user)

print("-- Create a new User 2 --")
my_user2 = User()
my_user2.first_name = "John"
my_user2.email = "airbnb2@mail.com"
my_user2.password = "root"
my_user2.date_of_birth = "1999/01/01"
my_user2.save()
print(my_user2)

print("--Create a new User 2 --")
my_user3 = User()
my_user3.first_name = "Jane"
my_user.last_name = "Doe"
my_user3.email = "janedoe111@gmail.com"
my_user3.password = "22254"
my_user3.date_of_birth = "1980/12/22"
