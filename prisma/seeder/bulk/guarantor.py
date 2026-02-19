import random
from datetime import datetime, timedelta
import uuid
from function import calculate_age, read_ids_from_sql


def generate_guarantors_bulk_insert_sql(
    n,
    fullNames,
    cities,
    genders,
    employment_types,
    marital_statuses,
    relationships,
    ids="./prisma/seeder/sql/customers_seed.sql",
    filename="./prisma/seeder/sql/guarantors_seed.sql",
):
    customer_ids = read_ids_from_sql(ids)

    if not customer_ids:
        raise ValueError(f"Tidak ada customer ID yang ditemukan di file: {ids}")

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
        employment_name = "amang audio"
        employment_period = random.randint(1, 20)
        relationship = random.choice(relationships)
        customer_id = random.choice(customer_ids)

        rows.append(
            f"('{id}', '{name}', '{national_id}', '{birth_place}', '{birth_date}', "
            f"'{gender}', {age}, '{phone}', '{email}', 'Address {i}', "
            f"'{marital_status}', '{employment_type}', '{employment_name}', "
            f"{employment_period}, '{relationship}', '{customer_id}', NOW(), NOW())"
        )

    sql = (
        "INSERT INTO guarantors (\n"
        "id, full_name, national_id, birth_place, birth_date, gender, age, phone, email, address,\n"
        "marital_status, employment_type, employment_name, employment_period,\n"
        "relationship, customer_id, created_at, updated_at\n"
        ") VALUES\n" + ",\n".join(rows) + ";"
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(sql)

    return filename
