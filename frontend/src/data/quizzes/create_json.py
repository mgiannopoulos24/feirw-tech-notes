import json
import sys
import re

def parse_statements(text):
    # Split at each "", ignore empty splits
    parts = [part.strip() for part in text.split("") if part.strip()]
    statements = []
    for part in parts:
        # Replace newlines not followed by "" with a space
        # (since we've already split by "", just replace all newlines with spaces)
        statement = re.sub(r'\n+', ' ', part)
        statements.append(statement.strip())
    return statements

def create_questions(statements, category):
    questions = []
    for idx, statement in enumerate(statements, 1):
        questions.append({
            "id": str(idx),
            "category": category,
            "question": statement,
            "answers": [
                {"text": "Σωστό", "correct": True},
                {"text": "Λάθος", "correct": False}
            ]
        })
    return questions

def main():
    if len(sys.argv) != 4:
        print("Usage: python create_json.py input.txt output.json category")
        return

    input_file, output_file, category = sys.argv[1], sys.argv[2], sys.argv[3]

    with open(input_file, encoding="utf-8") as f:
        text = f.read()

    statements = parse_statements(text)
    questions = create_questions(statements, category)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()