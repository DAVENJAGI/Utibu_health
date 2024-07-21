#!usr/bin/python3
"""This is a class containing the user  details"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.schema import PrimaryKeyConstraint
from models.doctor import Doctor
from models.hospital import Hospital
from models.user import User
from models.medication import Medication


class Order(BaseModel, Base):
    """Represents order details"""
    if models.storage_type == "db":
        __tablename__ = 'orders'
        doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
        medication_id = Column(String(60), ForeignKey('medication.id'), nullable=False)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        delivery_mode = Column(String(128), default="Pickup from hospital")
        billing_cost = Column(Integer, nullable=False)
        order_status = Column(String(60), nullable=False, default="pending approval")
        quantity = Column(Integer, nullable=False)
        __table__args__ = (PrimaryKeyConstraint(doctor_id, medication_id, user_id),)
 
#        user = relationship("User", backref="appointment") 
#        doctor = relationship("Doctor", backref="appointment")
    else:
        doctor_id = ""
        hospital_id = ""
        user_id = ""
        description = ""
        time = ""
        date = ""
