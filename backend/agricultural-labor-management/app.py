from flask import Flask, render_template  
from db import get_db  # Import the helper function for MongoDB connection  
from flask import Flask, render_template, request, redirect, url_for, session, flash  
from werkzeug.security import generate_password_hash, check_password_hash  
from db import get_db  # Import MongoDB connection helper 
from datetime import datetime 
from bson.objectid import ObjectId  # For working with MongoDB ObjectId 
  
# Initialize Flask app  
app = Flask(__name__)  
app.config.from_object('config.Config')  
  
# Initialize the database connection  
db = get_db()  
  
# Home Route  
@app.route('/')  
def home():  
    return render_template('index.html')  # Placeholder for the base page  
  
# Test Route for MongoDB (Ensure connection works)  
@app.route('/test-mongo')  
def test_mongo():  
    try:  
        # Example: Insert a test document into a test collection  
        db.test_collection.insert_one({"message": "MongoDB Connected Successfully!"})  
        return "MongoDB Connection and Test Document Insertion Successful!"  
    except Exception as e:  
        return f"MongoDB Test Failed: {e}"  
    
    
# Manager Registration Route  
@app.route('/register-manager', methods=['GET', 'POST'])  
def register_manager():  
    if request.method == 'POST':  
        # Get form data  
        username = request.form['username']  
        password = request.form['password']  
        contact = request.form['contact']  
  
        # Check if username already exists  
        existing_user = db.users.find_one({"username": username})  
        if existing_user:  
            flash("Username already exists. Please choose a different username.", "danger")  
            return redirect(url_for('register_manager'))  
  
        # Hash the password for security  
        hashed_password = generate_password_hash(password)  
  
        # Create user document for manager  
        user = {  
            "username": username,  
            "password": hashed_password,  
            "role": "manager",  
            "contact": contact  
        }  
  
        # Insert the manager into the database  
        db.users.insert_one(user)  
        flash("Manager registration successful! Please log in.", "success")  
        return redirect(url_for('login'))  
  
    return render_template('register_manager.html')  
  
  
# Laborer Registration Route  
@app.route('/register-laborer', methods=['GET', 'POST'])  
def register_laborer():  
    if request.method == 'POST':  
        # Get form data  
        username = request.form['username']  
        password = request.form['password']  
        contact = request.form['contact']  
        skills = request.form['skills'].split(",")  # Parse comma-separated skills  
        freelancer = bool(request.form.get('freelancer'))  # Checkbox input  
  
        # Check if username already exists  
        existing_user = db.users.find_one({"username": username})  
        if existing_user:  
            flash("Username already exists. Please choose a different username.", "danger")  
            return redirect(url_for('register_laborer'))  
  
        # Hash the password for security  
        hashed_password = generate_password_hash(password)  
  
        # Create user document for laborer  
        user = {  
            "username": username,  
            "password": hashed_password,  
            "role": "laborer",  
            "contact": contact,  
            "skills": skills,  
            "freelancer": freelancer  
        }  
  
        # Insert the laborer into the database  
        db.users.insert_one(user)  
        flash("Laborer registration successful! Please log in.", "success")  
        return redirect(url_for('login'))  
  
    return render_template('register_laborer.html')   
  
# Login Route  
@app.route('/login', methods=['GET', 'POST'])  
def login():  
    if request.method == 'POST':  
        # Get form data  
        username = request.form['username']  
        password = request.form['password']  
  
        # Find user in database  
        user = db.users.find_one({"username": username})  
        if not user or not check_password_hash(user['password'], password):  
            flash("Invalid username or password.", "danger")  
            return redirect(url_for('login'))  
  
        # Start a session  
        session['username'] = user['username']  
        session['role'] = user['role']  
        flash("Login successful!", "success")  
  
        # Redirect based on role  
        if user['role'] == 'manager':  
            return redirect(url_for('manager_dashboard'))  
        elif user['role'] == 'laborer':  
            return redirect(url_for('laborer_dashboard'))  
  
    return render_template('login.html')  
  
# Logout Route  
@app.route('/logout')  
def logout():  
    session.clear()  # Clear all session data  
    flash("You have been logged out.", "info")  
    return redirect(url_for('login'))  




@app.route('/manager-dashboard')  
def manager_dashboard():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    return render_template('manager_dashboard.html')  

@app.route('/view-laborers')  
def view_laborers():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    # Get the logged-in manager's username  
    manager_username = session.get('username')  
  
    # Fetch laborers managed by this manager  
    laborers = db.users.find({"role": "laborer", "manager": manager_username})  
  
    return render_template('view_laborers.html', laborers=laborers)    
  
  
@app.route('/view-payments')  
def view_payments():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    # Get the logged-in manager's username  
    manager_username = session.get('username')  
  
    # Fetch payments made by this manager  
    payments = db.payments.find({"manager_id": manager_username})  
  
    return render_template('view_payments.html', payments=payments)   
    
@app.route('/laborer-dashboard')  
def laborer_dashboard():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Get the logged-in laborer's username  
    laborer_username = session.get('username')  
  
    # Fetch the laborer's details from the database  
    laborer = db.users.find_one({"username": laborer_username})  
  
    if not laborer:  
        # Handle the case where the laborer document is not found  
        flash("Error: Laborer details not found. Please contact support.", "danger")  
        return redirect(url_for('logout'))  
  
    # Fetch pending join requests for this laborer  
    pending_request = db.join_requests.find_one({"laborer": laborer_username, "status": "pending"})  
  
    # Fetch accepted join requests for this laborer  
    accepted_request = db.join_requests.find_one({"laborer": laborer_username, "status": "accepted"})  
  
    return render_template(  
        'laborer_dashboard.html',  
        laborer=laborer,  # Pass laborer details  
        pending_request=pending_request,  # Pass pending join request (if any)  
        accepted_request=accepted_request  # Pass accepted join request (if any)  
    )   
    
  
@app.route('/assign-task', methods=['GET', 'POST'])  
def assign_task():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    if request.method == 'POST':  
        # Get form data  
        task_name = request.form['task_name']  
        description = request.form['description']  
        assigned_to = request.form['assigned_to']  
        deadline = request.form['deadline']  
        manager_username = session.get('username')  
  
        # Create the task document  
        task = {  
            "task_name": task_name,  
            "description": description,  
            "assigned_to": assigned_to,  
            "manager": manager_username,  
            "deadline": deadline,  
            "status": "pending"  
        }  
  
        # Insert the task into the tasks collection  
        db.tasks.insert_one(task)  
  
        flash("Task assigned successfully!", "success")  
        return redirect(url_for('manager_dashboard'))  
  
    # Fetch laborers managed by this manager for the dropdown list  
    laborers = db.users.find({"role": "laborer", "manager": session.get('username')})  
    return render_template('assign_task.html', laborers=laborers)  


@app.route('/view-tasks')  
def view_tasks():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    # Fetch tasks created by the logged-in manager  
    manager_username = session.get('username')  
    tasks = db.tasks.find({"manager": manager_username})  
  
    return render_template('view_tasks.html', tasks=tasks)  

@app.route('/update-task/<task_id>', methods=['POST'])  
def update_task(task_id):  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Find the task in the database  
    task = db.tasks.find_one({"_id": task_id, "assigned_to": session.get('username')})  
  
    if not task:  
        flash("Task not found or not assigned to you!", "danger")  
        return redirect(url_for('laborer_dashboard'))  
  
    # Update the task status  
    db.tasks.update_one({"_id": task["_id"]}, {"$set": {"status": "completed"}})  
    flash("Task marked as completed!", "success")  
    return redirect(url_for('laborer_dashboard'))  

@app.route('/record-attendance', methods=['GET', 'POST'])  
def record_attendance():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    if request.method == 'POST':  
        # Get form data  
        date = request.form['date']  
        laborer_id = request.form['laborer_id']  
        status = request.form['status']  
        manager_id = session.get('username')  
  
        # Insert attendance record  
        attendance_record = {  
            "laborer_id": laborer_id,  
            "manager_id": manager_id,  
            "date": date,  
            "status": status  
        }  
        db.attendance.insert_one(attendance_record)  
  
        flash(f"Attendance recorded for {laborer_id} on {date}.", "success")  
        return redirect(url_for('manager_dashboard'))  
  
    # Get the list of laborers under the manager  
    laborers = db.users.find({"role": "laborer", "manager": session.get('username')})  
  
    return render_template('record_attendance.html', laborers=laborers)  

@app.route('/view-attendance')  
def view_attendance():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    # Get attendance records for laborers managed by the logged-in manager  
    manager_id = session.get('username')  
    attendance = db.attendance.find({"manager_id": manager_id})  
  
    return render_template('view_attendance.html', attendance=attendance)  

@app.route('/record-payment', methods=['GET', 'POST'])  
def record_payment():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    if request.method == 'POST':  
        # Get form data  
        laborer_id = request.form['laborer_id']  
        amount = float(request.form['amount'])  
        manager_id = session.get('username')  
        payment_date = request.form['payment_date']  
  
        # Create payment record  
        payment_record = {  
            "laborer_id": laborer_id,  
            "manager_id": manager_id,  
            "amount": amount,  
            "payment_date": payment_date,  
            "status": "paid"  
        }  
        db.payments.insert_one(payment_record)  
  
        flash(f"Payment of ₹{amount} recorded for {laborer_id}.", "success")  
        return redirect(url_for('manager_dashboard'))  
  
    # Get laborers managed by the manager  
    laborers = db.users.find({"role": "laborer", "manager": session.get('username')})  
  
    return render_template('record_payment.html', laborers=laborers)  

@app.route('/laborer-tasks')  
def laborer_tasks():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Get the logged-in laborer's username  
    laborer_username = session.get('username')  
  
    # Fetch tasks assigned to this laborer  
    tasks = db.tasks.find({"assigned_to": laborer_username})  
  
    return render_template('laborer_tasks.html', tasks=tasks)  

@app.route('/laborer-attendance')  
def laborer_attendance():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Get attendance records for the logged-in laborer  
    laborer_id = session.get('username')  
    attendance = db.attendance.find({"laborer_id": laborer_id})  
  
    return render_template('laborer_attendance.html', attendance=attendance)  

@app.route('/laborer-payments')  
def laborer_payments():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Fetch payment records for the logged-in laborer  
    laborer_id = session.get('username')  
    payments = db.payments.find({"laborer_id": laborer_id})  
  
    return render_template('laborer_payments.html', payments=payments)  


@app.route('/available-managers')  
def available_managers():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Get the logged-in laborer's username  
    laborer_username = session.get('username')  
  
    # Check if the laborer already has a manager  
    laborer = db.users.find_one({"username": laborer_username})  
    if laborer.get("manager"):  
        # Laborer already has a manager; show message or redirect  
        flash("You are already working under a manager.", "info")  
        return redirect(url_for('laborer_dashboard'))  
  
    # Fetch all available managers  
    managers = db.users.find({"role": "manager"})  
  
    return render_template('available_managers.html', managers=managers)  

@app.route('/join-manager', methods=['POST'])  
def join_manager():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    # Get the manager's username from the form  
    manager_username = request.form['manager_username']  
    laborer_username = session.get('username')  
  
    # Update the laborer's manager field in the database  
    db.users.update_one(  
        {"username": laborer_username},  
        {"$set": {"manager": manager_username}}  
    )  
  
    flash(f"You have successfully joined manager {manager_username}.", "success")  
    return redirect(url_for('laborer_dashboard'))  

@app.route('/leave-manager', methods=['POST'])  
def leave_manager():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    laborer_username = session.get('username')  
  
    # Remove the manager from the laborer's profile  
    db.users.update_one(  
        {"username": laborer_username},  
        {"$unset": {"manager": ""}}  
    )  
  
    flash("You have successfully left your manager.", "success")  
    return redirect(url_for('laborer_dashboard'))  

from datetime import datetime  
  
from datetime import datetime  
  
@app.route('/send-request', methods=['POST'])  
def send_request():  
    # Restrict access to laborers only  
    if session.get('role') != 'laborer':  
        return "Access Denied", 403  
  
    laborer_username = session.get('username')  # Logged-in laborer's username  
    manager_username = request.form['manager_username']  # Manager selected by the laborer  
  
    # Ensure the laborer doesn't already have a manager  
    laborer = db.users.find_one({"username": laborer_username})  
    if laborer.get("manager"):  
        flash("You are already working under a manager. You must leave your current manager first.", "warning")  
        return redirect(url_for('laborer_dashboard'))  
  
    # Ensure there's no duplicate request  
    existing_request = db.join_requests.find_one({  
        "laborer": laborer_username,  
        "manager": manager_username,  
        "status": "pending"  
    })  
    if existing_request:  
        flash("You have already sent a request to this manager.", "info")  
        return redirect(url_for('laborer_dashboard'))  
  
    # Create a pending join request  
    join_request = {  
        "laborer": laborer_username,  
        "manager": manager_username,  
        "status": "pending",  
        "timestamp": datetime.utcnow().isoformat()  
    }  
    db.join_requests.insert_one(join_request)  
  
    flash("Join request sent successfully to the manager.", "success")  
    return redirect(url_for('laborer_dashboard'))  

@app.route('/notifications')  
def notifications():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    # Get the logged-in manager's username  
    manager_username = session.get('username')  
  
    # Fetch pending join requests for the manager  
    join_requests = list(db.join_requests.find({"manager": manager_username, "status": "pending"}))  
  
    # Fetch laborer details for each request  
    laborers = {}  
    for request in join_requests:  
        laborer = db.users.find_one({"username": request['laborer']})  
        if laborer:  
            laborers[request['laborer']] = {  
                "username": laborer['username'],  
                "skills": laborer.get('skills', []),  
                "contact": laborer.get('contact', "Not Provided"),  
            }  
  
    return render_template('notifications.html', join_requests=join_requests, laborers=laborers)   

  
  
@app.route('/respond-request', methods=['POST'])  
def respond_request():  
    # Restrict access to managers only  
    if session.get('role') != 'manager':  
        return "Access Denied", 403  
  
    request_id = request.form['request_id']  
    action = request.form['action']  # Either 'accept' or 'reject'  
  
    # Find the join request in the database  
    join_request = db.join_requests.find_one({"_id": ObjectId(request_id)})  
    if not join_request:  
        flash("Invalid join request.", "danger")  
        return redirect(url_for('notifications'))  
  
    laborer_username = join_request['laborer']  
    manager_username = join_request['manager']  
  
    if action == 'accept':  
        # Assign the laborer to the manager  
        db.users.update_one({"username": laborer_username}, {"$set": {"manager": manager_username}})  
        # Update the join request status to 'accepted'  
        db.join_requests.update_one({"_id": ObjectId(request_id)}, {"$set": {"status": "accepted"}})  
        flash(f"You have accepted {laborer_username}'s request.", "success")  
  
    elif action == 'reject':  
        # Update the join request status to 'rejected'  
        db.join_requests.update_one({"_id": ObjectId(request_id)}, {"$set": {"status": "rejected"}})  
        flash(f"You have rejected {laborer_username}'s request.", "info")  
  
    return redirect(url_for('notifications'))  


if __name__ == '__main__':  
    app.run(debug=True)  