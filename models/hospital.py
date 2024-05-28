#!usr/bin/python3
"""This is a class containing the user  details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table
from sqlalchemy.orm import relationship


if models.storage_type == 'db':
    hospital_doctors = Table('hospital_doctors', Base.metadata,
                          Column('hospital_id', String(60),
                                 ForeignKey('hospitals.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True),
                          Column('doctor_id', String(60),
                                 ForeignKey('doctors.id', onupdate='CASCADE',
                                            ondelete='CASCADE'),
                                 primary_key=True))



class Hospital(BaseModel, Base):
    """Represents user details"""
    if models.storage_type == 'db':
        __tablename__ = 'hospitals'
        town_id = Column(String(60), ForeignKey('wards.id'), nullable=False)
        email = Column(String(128), unique=True, nullable=False)
        name = Column(String(128), nullable=False)
        longitude = Column(Float, nullable=True)
        latitude = Column(Float, nullable=True)
        doctors = relationship("Doctor", backref="assigned_hospital", cascade="all, delete-orphan")
        

    else:
        town_id = ""
        email = ""
        name = ""
        longitude = 0.0
        latitude = 0.0
        doctors = []

        @property
        def doctor(self):
            from models.doctor import Doctor
            doctor_list = []
            all_doctors = models.storage.all(Doctor)
            for doctor in all_doctors.values():
                if doctor.hospital_id == self.id:
                    doctor_list.append(doctor)
            return doctor_list
