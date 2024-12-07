from flask import Flask, render_template, jsonify
from dotenv import load_dotenv
import os
from supabase import create_client

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

app = Flask(__name__)
supabase = create_client(url, key)

topics = [
    "C++ basics",
    "Variables and data types",
    "Operators and expressions",
    "Control flow statements (if-else, switch)",
    "Repetition (loops: for, while, do-while)",
    "C-style Arrays",
    "Strings and string manipulation",
]


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/questions")
def questions():
    return render_template("questions.html")


@app.route("/tips")
def tips():
    return render_template("tips.html")


@app.route("/get_questions")
def get_questions():
    response = supabase.table("questions").select("*").execute()
    data = {"topics": topics, "questions": response.data}
    return jsonify(data)


# For development environment
# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0")

# For production
if __name__ == "__main__":
    app.run()
