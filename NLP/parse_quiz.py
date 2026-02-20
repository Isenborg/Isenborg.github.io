#!/usr/bin/env python3
"""
Parse unit*.txt Q&A documents into JSON.
Works with the current format - uses indentation and 'Correct'/'Incorrect' as markers.
"""

import json
import re
import sys
from pathlib import Path


def parse_quiz(filepath: str, unit_name: str | None = None) -> dict:
    with open(filepath, encoding="utf-8") as f:
        lines = f.readlines()

    if unit_name is None:
        unit_name = Path(filepath).stem.replace("unit", "Unit ")
    data = {"unit": unit_name, "lectures": []}
    current_lecture = None
    current_question = None
    current_option = None
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()

        # Lecture header: LECTURE X.X
        if re.match(r"^LECTURE \d+\.\d+$", stripped):
            lecture_id = re.search(r"LECTURE (\d+\.\d+)", stripped).group(1)
            current_lecture = {
                "id": lecture_id,
                "questions": [],
            }
            data["lectures"].append(current_lecture)
            current_question = None
            i += 1
            continue

        # Question: Q1. or Q2. etc.
        q_match = re.match(r"^Q(\d+)\.\s*(.*)$", stripped)
        if q_match and current_lecture:
            q_num, q_text = q_match.groups()
            current_question = {
                "number": int(q_num),
                "question": q_text.strip() if q_text.strip() else "",
                "options": [],
                "images": [],
                "references_previous_question": False,
            }
            current_lecture["questions"].append(current_question)
            current_option = None
            i += 1
            # Collect multi-line question text
            while i < len(lines) and lines[i].startswith("    ") and not re.match(
                r"^\s{4}(Correct|Incorrect)\.", lines[i]
            ):
                cont = lines[i].strip()
                if cont and not cont.startswith("-"):
                    current_question["question"] += " " + cont
                i += 1
            current_question["question"] = current_question["question"].strip()
            continue

        # Option: "  - " prefix
        if re.match(r"^  - ", line) and current_question:
            opt_text = line[4:].strip()
            current_option = {
                "text": opt_text,
                "correct": None,
                "explanation": "",
            }
            current_question["options"].append(current_option)
            i += 1
            # Collect multi-line option text and then explanation
            while i < len(lines):
                next_line = lines[i]
                if next_line.startswith("  - "):
                    # Next option
                    break
                if re.match(r"^Q\d+\.", next_line.strip()) or re.match(
                    r"^LECTURE \d+\.\d+$", next_line.strip()
                ):
                    break
                if next_line.strip() == "":
                    i += 1
                    continue
                # 4 spaces: either option continuation or Correct/Incorrect
                if next_line.startswith("    "):
                    content = next_line[4:]
                    if content.strip().startswith("Correct."):
                        current_option["correct"] = True
                        current_option["explanation"] = content.strip()[9:].strip()
                        i += 1
                        # Collect explanation continuation (6 spaces)
                        while i < len(lines) and lines[i].startswith("      "):
                            current_option["explanation"] += " " + lines[i][6:].strip()
                            i += 1
                        current_option["explanation"] = current_option[
                            "explanation"
                        ].strip()
                        break
                    elif content.strip().startswith("Incorrect.") or content.strip().startswith("Incorrect,"):
                        raw = content.strip()
                        prefix_len = 11 if raw.startswith("Incorrect.") else 10
                        current_option["correct"] = False
                        current_option["explanation"] = raw[prefix_len:].strip()
                        i += 1
                        while i < len(lines) and lines[i].startswith("      "):
                            current_option["explanation"] += " " + lines[i][6:].strip()
                            i += 1
                        current_option["explanation"] = current_option[
                            "explanation"
                        ].strip()
                        break
                    else:
                        # Option continuation
                        current_option["text"] += " " + content.strip()
                        i += 1
                else:
                    i += 1
            continue

        i += 1

    # Post-process: set references_previous_question for questions that reference prior ones
    for lecture in data["lectures"]:
        for q in lecture["questions"]:
            if "previous question" in q["question"].lower():
                q["references_previous_question"] = True

    return data


def main():
    script_dir = Path(__file__).parent
    units = sys.argv[1:] if len(sys.argv) > 1 else ["unit1", "unit2", "unit3", "unit4"]

    for unit in units:
        txt_path = script_dir / f"{unit}.txt"
        if not txt_path.exists():
            print(f"Skipping {unit}: {txt_path} not found")
            continue
        json_path = script_dir / f"{unit}.json"

        data = parse_quiz(txt_path)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        count = sum(len(l["questions"]) for l in data["lectures"])
        print(f"Parsed {count} questions -> {json_path}")


if __name__ == "__main__":
    main()
