from datetime import datetime
import re


def calculate_age(birth_date):
    today = datetime.now()
    return (
        today.year
        - birth_date.year
        - ((today.month, today.day) < (birth_date.month, birth_date.day))
    )


def read_ids_from_sql(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex untuk menangkap UUID di posisi pertama setiap baris VALUES
    pattern = r"\('([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'"
    ids = re.findall(pattern, content)
    return ids
