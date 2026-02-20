# main.py
import sys
import os

sys.path.append(os.path.dirname(__file__))

from dummy import (
    FULL_NAMES,
    CITIES,
    GENDERS,
    EMPLOYMENT_TYPES,
    MARITAL_STATUSES,
    RELATIONSHIPS,
)
from admin import generate_admins_bulk_insert_sql
from customer import generate_customers_bulk_insert_sql
from guarantor import generate_guarantors_bulk_insert_sql
from bank_account import generate_bank_accounts_bulk_insert_sql


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

    # ✅ Guarantor hanya berjalan jika customer_file sudah tersedia dan file-nya ada
    if not customer_file or not os.path.exists(customer_file):
        raise FileNotFoundError(
            f"❌ Customer seed file tidak ditemukan: {customer_file}. Guarantor generation dibatalkan."
        )

    guarantor_file = generate_guarantors_bulk_insert_sql(
        n=50,
        fullNames=FULL_NAMES,
        cities=CITIES,
        genders=GENDERS,
        employment_types=EMPLOYMENT_TYPES,
        marital_statuses=MARITAL_STATUSES,
        relationships=RELATIONSHIPS,
        ids=customer_file,  # ✅ Gunakan return value langsung, bukan hardcode path
        filename="./prisma/seeder/sql/guarantors_seed.sql",
    )
    print(f"✅ Guarantors SQL generated: {guarantor_file}")

    bank_account_file = generate_bank_accounts_bulk_insert_sql(
        n=50,
        fullNames=FULL_NAMES,
        ids=customer_file,  # ✅ Gunakan return value langsung, bukan hardcode path
        filename="./prisma/seeder/sql/bank_accounts_seed.sql",
    )
    print(f"✅ Bank Accounts SQL generated: {bank_account_file}")

    print("🎉 All SQL files generated successfully!")


if __name__ == "__main__":
    main()
