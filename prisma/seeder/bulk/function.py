from datetime import datetime


def calculate_age(birth_date):
    today = datetime.now()
    return (
        today.year
        - birth_date.year
        - ((today.month, today.day) < (birth_date.month, birth_date.day))
    )
