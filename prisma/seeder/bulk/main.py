# main.py
import sys
import os

sys.path.append(os.path.dirname(__file__))

from dummy import FULL_NAMES, CITIES, GENDERS, EMPLOYMENT_TYPES, MARITAL_STATUSES
from admin import generate_admins_bulk_insert_sql
from customer import generate_customers_bulk_insert_sql


def main():
    print("🚀 Starting seeder generation...")

    admin_file = generate_admins_bulk_insert_sql(
        n=50,
        fullNames=FULL_NAMES,
        cities=CITIES,
        genders=GENDERS,
        marital_statuses=MARITAL_STATUSES,
        filename="./prisma/seeder/sql/admins_seed.sql",
    )
    print(f"✅ Admins SQL generated: {admin_file}")

    customer_file = generate_customers_bulk_insert_sql(
        n=50,
        fullNames=FULL_NAMES,
        cities=CITIES,
        genders=GENDERS,
        employment_types=EMPLOYMENT_TYPES,
        marital_statuses=MARITAL_STATUSES,
        filename="./prisma/seeder/sql/customers_seed.sql",
    )
    print(f"✅ Customers SQL generated: {customer_file}")

    print("🎉 All SQL files generated successfully!")


if __name__ == "__main__":
    main()
