from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "secret-key"  # Needed for flash messages

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ccbc.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Database models
class PrayerRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route("/")
def index():
    prayers = PrayerRequest.query.all()
    return render_template("index.html", prayers=prayers)

@app.route("/submit-prayer", methods=["POST"])
def submit_prayer():
    name = request.form.get("prayer-name")
    message = request.form.get("prayer-message")

    if not name or not message:
        flash("Please fill in both name and message fields.", "error")
        return redirect(url_for("index"))

    new_prayer = PrayerRequest(name=name, message=message)
    db.session.add(new_prayer)
    db.session.commit()
    flash("Prayer request submitted successfully!", "success")
    return redirect(url_for("index"))

@app.route("/submit-contact", methods=["POST"])
def submit_contact():
    name = request.form.get("contact-name")
    email = request.form.get("contact-email")
    message = request.form.get("contact-message")

    if not name or not email or not message:
        flash("Please fill in all contact fields.", "error")
        return redirect(url_for("index"))

    new_contact = ContactMessage(name=name, email=email, message=message)
    db.session.add(new_contact)
    db.session.commit()
    flash("Contact message received! We'll get back to you soon.", "success")
    return redirect(url_for("index"))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
