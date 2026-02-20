import random
from datetime import datetime, timedelta
import uuid
from function import read_ids_from_sql


def generate_bank_accounts_bulk_insert_sql(
    n,
    fullNames,
    ids="./prisma/seeder/sql/customers_seed.sql",
    filename="./prisma/seeder/sql/bank_accounts_seed.sql",
):
    customer_ids = read_ids_from_sql(ids)

    if not customer_ids:
        raise ValueError(f"Tidak ada customer ID yang ditemukan di file: {ids}")

    rows = []
    used_account_numbers = set()

    for i in range(1, n + 1):
        id = uuid.uuid4()
        name = random.choice(fullNames).lower()
        is_primary = "TRUE" if i == 1 else random.choice(["TRUE", "FALSE"])
        is_verified = random.choice(["TRUE", "FALSE"])
        is_active = random.choice(["TRUE", "FALSE"])
        customer_id = random.choice(customer_ids)

        while True:
            account_number = str(random.randint(10**9, 10**10 - 1))
            if account_number not in used_account_numbers:
                used_account_numbers.add(account_number)
                break

        rows.append(
            f"('{id}', '{name}', '{account_number}', "
            f"{is_primary}, {is_verified}, {is_active}, "
            f"'{customer_id}', NOW(), NOW())"
        )

    sql = (
        "INSERT INTO bank_accounts (\n"
        "id, account_name, account_number, is_primary, is_verified, is_active,\n"
        "customer_id, created_at, updated_at\n"
        ") VALUES\n" + ",\n".join(rows) + ";"
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(sql)

    return filename
