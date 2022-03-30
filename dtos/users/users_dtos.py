from mailbox import Babyl
from typing import Union, Optional, Dict, List
from dataclasses import dataclass, field

from numpy import character
from dtos import BaseOutputDTO


@dataclass
class FindIdOutputDTO(BaseOutputDTO):
    id: int
    email: str
    temp: int

    dto_name: str = field(default="findid", init=False)
