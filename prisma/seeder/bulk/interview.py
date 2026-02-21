import random
import uuid
from function import read_ids_from_sql


def generate_interview_questions_bulk_insert_sql(
    n,
    question_types,
    question_categories,
    sample_questions,
    options_map,
    admin_ids="./prisma/seeder/sql/admins_seed.sql",
    filename="./prisma/seeder/sql/interview_questions_seed.sql",
):
    creator_ids = read_ids_from_sql(admin_ids)

    if not creator_ids:
        raise ValueError(f"Tidak ada admin ID yang ditemukan di file: {admin_ids}")

    rows = []
    for i in range(1, n + 1):
        id = uuid.uuid4()
        category = random.choice(question_categories)
        question_pool = sample_questions.get(
            category, ["Please describe your situation."]
        )
        question_text = random.choice(question_pool).replace("'", "''")
        question_type = random.choice(question_types)
        is_required = random.choice([True, False])
        is_active = random.choice([True, False])
        order_number = i
        options = options_map.get(question_type, [])
        options_sql = "{" + ",".join(f'"{opt}"' for opt in options) + "}"
        placeholder = (
            f"Please enter your {category} information"
            if question_type
            not in ["single_choice", "multiple_choice", "yes_no", "true_false"]
            else None
        )
        placeholder_sql = f"'{placeholder}'" if placeholder else "NULL"
        creator_id = random.choice(creator_ids)
        updater_id = random.choice(creator_ids)

        rows.append(
            f"('{id}', '{question_text}', '{question_type}', '{category}', "
            f"{str(is_required).upper()}, {str(is_active).upper()}, {order_number}, "
            f"'{options_sql}', {placeholder_sql}, "
            f"'{creator_id}', '{updater_id}', NOW(), NOW())"
        )

    sql = (
        "INSERT INTO interview_questions (\n"
        "id, question_text, question_type, category, is_required, is_active, order_number,\n"
        "options, placeholder, creator_id, updater_id, created_at, updated_at\n"
        ") VALUES\n" + ",\n".join(rows) + ";"
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(sql)

    return filename
