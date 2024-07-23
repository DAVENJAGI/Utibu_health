#!/usr/bin/python3
"""This is the engine for utibu health app for mapping data models to SQL database"""

import cmd
import models
from models.base_model import BaseModel, Base
from models.user import User
from models.appointment import Appointment
from models.town import Town
from models.hospital import Hospital
from models.doctor import Doctor
from models.county import County
from models.disease import Disease
from models.medication import Medication
from models.user import User
from models.order import Order
from models.request import Request
from models.constituency import Constituency
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from os import getenv


"""Maps the names eg, "Amenity", to classes, egw class Amenity"""

classes = {"Appointment": Appointment, "BaseModel": BaseModel, "County": County, "Town": Town,
           "Hospital": Hospital, "Order": Order, "Request": Request, "Doctor": Doctor, "User": User, "Constituency": Constituency, "Disease": Disease, "Medication": Medication}

class DBStorage:
    """class storage"""
    __engine = None
    __session = None

    def __init__(self):
        """initializing the class"""
        utibu_MYSQL_USER = getenv('utibu_MYSQL_USER')
        utibu_MYSQL_PWD = getenv('utibu_MYSQL_PWD')
        utibu_MYSQL_HOST = getenv('utibu_MYSQL_HOST')
        utibu_MYSQL_DB = getenv('utibu_MYSQL_DB')
        utibu_ENV = getenv('utibu_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(utibu_MYSQL_USER,
                                             utibu_MYSQL_PWD,
                                             utibu_MYSQL_HOST,
                                             utibu_MYSQL_DB))
        if utibu_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """A method to retrieve one object"""
        query = self.__session.query(cls).filter(cls.id == id)
        return query.first()

    def count(self, cls=None):
        """counts the number of object in storage"""
        obj = self.all(cls)
        return len(obj)
    def getLogin(self, cls, email):
        """A method to retrieve one object"""
        query = self.__session.query(cls).filter(cls.email == email)
        return query.first()


