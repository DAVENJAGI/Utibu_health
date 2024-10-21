#!usr/bin/python3
"""This is a class containing the appointment details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from models.doctor import Doctor
from models.hospital import Hospital
from models.user import User

if models.storage_type == 'db':
    all_appointments = Table('all_appointments', Base.metadata,
                          Column('user_id', String(60),
                                 ForeignKey('users.id'), nullable=False),
                          Column('doctor_id', String(60),
                                 ForeignKey('doctors.id'), nullable=False),                         
                         )


class Appointment(BaseModel, Base):
    """Represents appointment details"""
    if models.storage_type == "db":
        __tablename__ = 'appointment'
        description = Column(String(256), nullable=False, default="There is currently no set appointment. Kindly set one with your doctor")
        time = Column(String(128), nullable=False, default="There is currently no set appointment")
        date = Column(String(128), nullable=False)
        doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
        appointments = relationship("User", secondary=all_appointments, backref="appointment",
                                    primaryjoin="all_appointments.c.user_id == Appointment.user_id",
                                    secondaryjoin="all_appointments.c.doctor_id == User.id")
        appointment_status = Column(String(60), default="Pending Confirmation") 
     
#        user = relationship("User", backref="appointment") 
#         doctor = relationship("Doctor", backref="appointment")
    else:
        doctor_id = ""
        hospital_id = ""
        user_id = ""
        description = ""
        time = ""
        date = ""
