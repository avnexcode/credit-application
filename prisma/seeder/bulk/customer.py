import random
from datetime import datetime, timedelta
import uuid
from function import calculate_age


def generate_customers_bulk_insert_sql(
    n,
    fullNames,
    cities,
    genders,
    employment_types,
    marital_statuses,
    filename="./prisma/seeder/sql/customers_seed.sql",
):
    rows = []

    for i in range(1, n + 1):
        id = uuid.uuid4()
        name = random.choice(fullNames).lower()
        national_id = str(random.randint(10**15, 10**16 - 1))
        birth_place = random.choice(cities).lower()
        birth_date_dt = datetime.now() - timedelta(days=random.randint(7000, 20000))
        birth_date = birth_date_dt.strftime("%Y-%m-%d")
        gender = random.choice(genders)
        age = calculate_age(birth_date_dt)
        phone = "08" + str(random.randint(10**9, 10**10 - 1))
        email = name.lower().replace(" ", ".") + f"{i}@mail.com"
        marital_status = random.choice(marital_statuses)
        employment_type = random.choice(employment_types)
        employment_name = "Amang Audio".lower()
        employment_period = random.randint(1, 20)

        rows.append(
            f"('{id}', '{name}', '{national_id}', '{birth_place}', '{birth_date}', "
            f"'{gender}', {age}, '{phone}', '{email}', 'Address {i}', "
            f"'{marital_status}', '{employment_type}', '{employment_name}', "
            f"{employment_period}, NOW(), NOW())"
        )

    sql = (
        "INSERT INTO customers (\n"
        "id, full_name, national_id, birth_place, birth_date, gender, age, phone, email, address,\n"
        "marital_status, employment_type, employment_name, employment_period, created_at, updated_at\n"
        ") VALUES\n" + ",\n".join(rows) + ";"
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(sql)

    return filename
