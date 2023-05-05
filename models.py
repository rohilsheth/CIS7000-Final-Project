from dataclasses import dataclass
from typing import List

@dataclass
class Complaint:
    complaint: str
    related_procedures: List[str]