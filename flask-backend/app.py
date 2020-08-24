import matplotlib.pyplot as plt
import logging
import uuid
import pymysql.cursors as cursors
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from io import BytesIO
import os
import flask
from flask_mail import Mail, Message
from flask import json, make_response, jsonify, request, Flask, Response, render_template, send_file
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from model import Model
from flask_jwt_extended import (create_access_token)
import pymysql
from geopy.geocoders import Nominatim
import matplotlib
matplotlib.use('Agg')

app = flask.Flask(__name__, template_folder='templates')

app.config['MYSQL_HOST'] = 'database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'rentickly'
app.config['MYSQL_DB'] = 'rentickly'
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config["CORS_HEADERS"] = "Content-Type"

# SMTP Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.mail.yahoo.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'amithmuthyala@yahoo.com'
app.config['MAIL_PASSWORD'] = 'pyrdgfzsdeieavkr'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
mail = Mail(app)
CORS(app)


@app.route("/")
def my_index():
    return render_template("index.html", token="CSCI 5709 Group 10 Rentickly")


@app.route('/users/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    password = ''
    username = ''
    security = ''
    if request.get_json()['username']:
        username = request.get_json()['username']
    if request.get_json()['email']:
        email = request.get_json()['email']
    if request.get_json()['security']:
        security = request.get_json()['security']
    if request.get_json()['password']:
        password = bcrypt.generate_password_hash(
            request.get_json()['password']).decode('utf-8')

    cur.execute("SELECT * from Users where email=%s",
                [email])
    rv = cur.fetchone()
    result = ""
    if rv:
        return result
    cur.execute("INSERT INTO Users(username,email,password,security_question) VALUES (%s, %s,%s,%s)",
                (username, email, password, security))

    mysql.connection.commit()

    result = {
        "username": username,
        "email": email,
        "password": password,
        "security": security
    }

    return jsonify({"result": result})


@app.route('/users/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    security = request.get_json()['security']
    result = ""
    cur.execute("SELECT * from Users where email=%s", [email])
    rv = cur.fetchone()
    if not rv:
        return result

    if bcrypt.check_password_hash(rv['password'], password) and rv['security_question'] == security:
        access_token = create_access_token(
            identity={'userid': rv['userId'], 'username': rv['username'], 'email': rv['email']})
        result = access_token

    return result


@app.route('/users/resetpwd', methods=['POST'])
def reset():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['newpwd']
    security = request.get_json()['security']
    cur.execute("SELECT * from Users where email=%s", [email])
    rv = cur.fetchone()
    result = ""
    if rv:
        if security == rv['security_question']:
            if request.get_json()['newpwd']:
                password = bcrypt.generate_password_hash(
                    request.get_json()['newpwd']).decode('utf-8')
            cur.execute("UPDATE Users SET password=%s WHERE email=%s",
                        (password, email))

            mysql.connection.commit()
            result = {
                "email": email,
                "password": password,
                "security": security
            }

    return jsonify({"result": result})


@app.route('/users/delete', methods=['POST'])
def delete():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    cur.execute("DELETE FROM Users WHERE email=%s",
                [email])

    mysql.connection.commit()
    result = {
        "email": email,
    }

    return jsonify({"result": result})


@app.route('/users/update', methods=['POST'])
def update():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    email = request.get_json()['email']
    cur.execute("UPDATE Users SET username=%s WHERE email=%s",
                (username, email))

    mysql.connection.commit()
    result = {
        "email": email,
        "username": username
    }
    cur.execute("SELECT * from Users where email=%s", [email])
    rv = cur.fetchone()
    access_token = create_access_token(
        identity={'userid': rv['userId'], 'username': rv['username'], 'email': rv['email']})
    result = access_token

    return result

# Author: Amith Reddy Muthyala
# API to get all the appointments scheduled with the userID


@app.route("/getappointmentsscheduledwithme/<userId>")
def getappointmentsscheduledwithme(userId):
    cur = mysql.connection.cursor()
    appointmentStatus = "false"
    print('userId' + userId)
    cur.execute("SELECT a1.userId, a2.aId, a2.adTitle FROM bookAppointment a1, advertisements a2 WHERE a1.aId = a2.aId AND a1.appointmentstatus=%s  AND a2.userId=%s", (appointmentStatus, userId))
    rv = cur.fetchall()
    rv = json.dumps(rv, default=str)
    cur.close()
    return rv

# Author: Amith Reddy Muthyala
# Api to get all appointments of a user with the help of userID


@app.route("/getallappointments/<userId>")
def getallappointments(userId):
    cur = mysql.connection.cursor()
    print('userId' + userId)
    cur.execute("SELECT * FROM bookAppointment WHERE userId=%s", [userId])
    rv = cur.fetchall()
    rv = json.dumps(rv, default=str)
    cur.close()
    return rv

# Author: Amith Reddy Muthyala
# Api to add an appointment by taking advertisment id as a parameter


@app.route("/addappointment/<aId>", methods=['POST'])
def addappointment(aId):
    cur = mysql.connection.cursor()
    fname = request.get_json()['firstName']
    lname = request.get_json()['lastName']
    email = request.get_json()['email']
    date = request.get_json()['appointmentDate']
    time = request.get_json()['myTime']
    userId = request.get_json()['userId']
    appointmentStatus = "false"

    cur.execute("INSERT INTO bookAppointment (firstname, lastname, email, date, time, appointmentstatus, userId, aId) VALUES('" +
                str(fname) + "','" +
                str(lname) + "','" +
                str(email) + "','" +
                str(date) + "','" +
                str(time) + "','" +
                str(appointmentStatus) + "','" +
                str(userId) + "','" +
                str(aId) + "')")

    mysql.connection.commit()

    result = {
        "fname": fname,
        "lname": lname,
        "email": email,
        "date": date,
        "time": time,
        "appointmentStatus": appointmentStatus,
        "userId": userId,
        "aId": aId
    }

    return jsonify({"result": result})

# Author: Amith Reddy Muthyala
# Api to register complaint of a user


@app.route("/registercomplaint", methods=["POST"])
def registercomplaint():
    cur = mysql.connection.cursor()
    userName = request.get_json()["userName"]
    email = request.get_json()["email"]
    subject = request.get_json()["subject"]
    message = request.get_json()["message"]
    resolved = "false"

    cur.execute("INSERT INTO contactUs (name, email, subject, message, resolved) VALUES('" +
                str(userName) + "','" +
                str(email) + "','" +
                str(subject) + "','" +
                str(message) + "','" +
                str(resolved) + "')")

    mysql.connection.commit()

    msg = Message("Your issue is registered successfully. Our support team will get in touch with you asap.",
                  sender="amithmuthyala@yahoo.com")
    msg.add_recipient(email)
    msg.body = "Your issue is registered successfully. Our support team will get in touch with you asap."
    mail.send(msg)

    result = {
        "userName": userName,
        "email": email,
        "subject": subject,
        "message": message,
        "resolved": resolved
    }

    return jsonify({"result": result})

# Author: Amith Reddy Muthyala
# Api to get all complaint messages for admin to reply


@app.route("/getallcomplaints")
def getallcomplaints():
    cur = mysql.connection.cursor()
    resolved = "false"
    cur.execute("SELECT * FROM contactUs WHERE resolved=%s", [resolved])
    rv = cur.fetchall()
    rv = json.dumps(rv, default=str)
    cur.close()
    print(rv)
    return rv

# Author: Amith Reddy Muthyala
# Send reply from admin


@app.route("/sendreply", methods=["POST"])
def sendreply():
    cur = mysql.connection.cursor()

    email = request.get_json()["email"]
    reply = request.get_json()["reply"]
    print(reply)
    resolved = "true"
    cur.execute("UPDATE contactUs SET resolved=%s WHERE email=%s",
                (resolved, email))

    mysql.connection.commit()

    msg = Message(reply, sender="amithmuthyala@yahoo.com")
    msg.add_recipient(email)
    msg.body = reply
    mail.send(msg)

    return "replysent"

# Author: Amith Reddy Muthyala
# Api to accept an appointment by the user


@app.route("/acceptappointment/<i>/<j>", methods=["POST"])
def acceptappointment(i, j):
    cur = mysql.connection.cursor()
    appointmentStatus = "true"
    cur.execute("UPDATE bookAppointment SET appointmentstatus=%s WHERE userId=%s AND aId=%s",
                (appointmentStatus, i, j))

    mysql.connection.commit()

    return "accepted"

# Author: Romal Sehgal
# This Api is responsible for inserting the advertisement details into MySQL Database


# Author: Romal Sehgal
# This Api is responsible for inserting the advertisement details into MySQL Database
@app.route("/postAd/post", methods=['POST'])
def postAdvertisement():
    dbObject = Model()
    ad_data = request.get_json()
    print(ad_data)
    geolocator = Nominatim(user_agent="csci5410-project")
    try:
        location = geolocator.geocode(ad_data['streetAddress'] + ad_data['propertyLocation'])
        latitude = location.latitude
        longitude = location.longitude
        ad_data['latitude'] = latitude
        ad_data['longitude'] = longitude

        get_id = dbObject.postAdvertisement(ad_data)

        dbObject = Model()
        dbObject.insertPropImages(get_id, ad_data['imageUrls'])

        return json.dumps(ad_data)
    except:
        location = geolocator.geocode(ad_data['streetAddress'])

        latitude = location.latitude
        longitude = location.longitude
        ad_data['latitude'] = latitude
        ad_data['longitude'] = longitude

        get_id = dbObject.postAdvertisement(ad_data)

        dbObject = Model()
        dbObject.insertPropImages(get_id, ad_data['imageUrls'])

        return json.dumps(ad_data)


@app.route("/updateAd/<aid>", methods=['PUT', 'POST'])
def updateAdvertisement(aid):
    ad_data = request.get_json()
    geolocator = Nominatim(user_agent="csci5410-project")
    location = geolocator.geocode(
        ad_data['streetAddress'] + ad_data['propertyLocation'])

    latitude = location.latitude
    longitude = location.longitude
    ad_data['latitude'] = latitude
    ad_data['longitude'] = longitude
    dbObject = Model()
    dbObject.updateAdvertisement(ad_data)

    return jsonify({"result": "updated successfully"})


@app.route("/deleteAd/<aid>")
def deleteAdvertisement(aid):
    dbObject = Model()
    dbObject.deleteAdvertisement(aid)

    return jsonify({"result": "advertisement deleted successfully"})

# Author: Romal Sehgal
# Thi Api is responsible for fetching the advertisement details by userId from the MySQL Database


@app.route("/user/getAds", methods=['POST', 'GET'])
@cross_origin(origin='*')
def getAdvertisements():
    dbObject = Model()
    email_data = request.get_json()

    email = email_data['email']

    records = dbObject.getAdvertisement(email)
    recordsObj = []
    for record in records:
        recordsObj.append({
            'aId': record[0],
            'adTitle': record[1],
            'userId': record[2],
            'propertyType': record[3],
            'propertyAddress': record[4],
            'zipCode': record[5],
            'propertyDescription': record[6],
            'petFriendly': record[7],
            'leaseType': record[8],
            'rentAmount': record[9],
            'propertyLocation': record[10],
            'contactTiming': record[11],
            'advertisementsStatus': record[12]
        })
    # records.headers.add("Access-Control-Allow-Origin", "*")

    return json.dumps({
        "record": recordsObj
    })


@app.route("/searchResults/<query>", methods=['GET', 'POST'])
@cross_origin()
def getData(query):

    if (request.method == "POST"):
        # return jsonify({"result": "Data is there"})

        searchTerm = query
        userid = request.get_json()['userid']
        print(searchTerm, userid)
        while True:
            # create connection
            conn = pymysql.connect(
                host="database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com",
                port=3306,
                user="admin",
                password="rentickly",
                db="rentickly",
                charset="utf8mb4",
                cursorclass=cursors.DictCursor,
            )

            if conn:
                try:
                    cursor = conn.cursor()

                    query = "set foreign_key_checks = 0"

                    cursor.execute(query)

                    cursor = conn.cursor()

                    insert_query = f"insert into searchSuggestions (searchTerm,userId) values ('{searchTerm}','{userid}')"

                    cursor.execute(insert_query)

                    cursor = conn.cursor()

                    query = "set foreign_key_checks = 1"

                    cursor.execute(query)

                    cursor = conn.cursor()

                    search_query = f"select aId,adTitle,propertyType,propertyAddress from advertisements where adTitle like '%{searchTerm}%' or propertyDescription like '%{searchTerm}%' or propertyLocation like '%{searchTerm}%'"

                    cursor.execute(search_query)

                    result = cursor.fetchall()
                    # print(result)

                    jsonObj = []

                    for record in result:
                        aid = record['aId']
                        cursor = conn.cursor()
                        search_query = f"select propImage from propImages where aId = '{aid}'"
                        cursor.execute(search_query)
                        resultImage = cursor.fetchone()

                        jsonObj.append({
                            "aId": record['aId'],
                            "adTitle": record["adTitle"],
                            "propertyType": record["propertyType"],
                            "propertyAddress": record["propertyAddress"],
                        })
                    conn.commit()
                finally:
                    conn.close()
                break
            else:
                logging.log(msg="Unable to connect to Database",
                            level=logging.debug)
        return jsonify({"Result": jsonObj})
    else:
        searchTerm = query
        while True:
            # create connection
            conn = pymysql.connect(
                host="database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com",
                port=3306,
                user="admin",
                password="rentickly",
                db="rentickly",
                charset="utf8mb4",
                cursorclass=cursors.DictCursor,
            )

            if conn:
                try:

                    cursor = conn.cursor()

                    search_query = f"select aId,adTitle,propertyType,propertyAddress from advertisements where adTitle like '%{searchTerm}%' or propertyDescription like '%{searchTerm}%' or propertyLocation like '%{searchTerm}%'"

                    cursor.execute(search_query)

                    result = cursor.fetchall()
                    # print(result)

                    jsonObj = []

                    conn.commit()

                    for record in result:
                        aid = record['aId']
                        cursor = conn.cursor()
                        search_query = f"select propImage from propImages where aId = '{aid}'"
                        cursor.execute(search_query)
                        resultImage = cursor.fetchone()

                        jsonObj.append({
                            "aId": record['aId'],
                            "adTitle": record["adTitle"],
                            "propertyType": record["propertyType"],
                            "propertyAddress": record["propertyAddress"],
                        })

                finally:
                    conn.close()
                break
            else:
                logging.log(msg="Unable to connect to Database",
                            level=logging.debug)
        return jsonify({"Result": jsonObj})


@app.route("/users/review", methods=["POST"])
@cross_origin()
def add_review():
    # Review Id
    reviewId = str(uuid.uuid4())
    reviewId = reviewId[:7]
    # review headline
    headline = str(request.json["headline"])
    # review
    review_content = str(request.json["content"])
    # rating
    rating = str(request.json["rating"])
    # user id
    userId = str(request.json["userId"])
    # adId
    aid = str(request.json["aid"])

    while True:
        # create connection
        conn = pymysql.connect(
            host="database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com",
            port=3306,
            user="admin",
            password="rentickly",
            db="rentickly",
            charset="utf8mb4",
            cursorclass=cursors.DictCursor,
        )

        if conn:
            try:

                cursor = conn.cursor()

                insert_query = "insert into Review(reviewId,reviewHead,rating,reviewDesc,userId,aId) values (%s,%s,%s,%s,%s,%s)"

                cursor.execute(
                    insert_query, (reviewId, headline, rating,
                                   review_content, userId, aid)
                )

                conn.commit()
            finally:
                conn.close()
            break
        else:
            logging.log(msg="Unable to connect to Database",
                        level=logging.debug)
    return jsonify({"Result": "Inserted Successfully"})


@app.route("/viewReview", methods=['POST'])
@cross_origin()
def viewReview():
    data = request.get_json()
    dbObject = Model()
    print(data)
    records = dbObject.ViewReview(data['aid'])

    # print(records)

    jsonObj = []
    for record in records:
        jsonObj.append(
            {"rId": record[0],
             "rating": record[1],
             "headline": record[2],
             "description": record[3],
             "username": record[6]}
        )
    return json.dumps({"result": jsonObj})


@app.route('/rentalForm', methods=['POST'])
def rentalForm():
    data = request.get_json()
    print(data)
    formData = data['data']
    userId = formData['userId']
    firstname = formData['firstname']
    lastname = formData['lastname']
    email = formData['email']
    phone = formData['phone']
    dob = formData['dob']
    status = formData['status']
    employer = formData['employer']
    income = formData['income']
    files = formData['files']

    cur = mysql.connection.cursor()
    query = "INSERT INTO rentalApplication(firstname, lastname, email, userId, phone, employer, e_status, files, income, dob) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

    cur.execute(query, (firstname, lastname, email, userId,
                        phone, employer, status, files, str(income), str(dob)))

    mysql.connection.commit()
    cur.close()

    response = Response(json.dumps(
        {"User": firstname}), status=200, mimetype="application/json")
    return response


@app.route('/myapplications/<userId>', methods=['GET'])
def myApplications(userId):
    cur = mysql.connection.cursor()
    query_string = "SELECT * FROM rentalApplication where userId="+userId
    cur.execute(query_string)
    formData = []
    data = cur.fetchall()

    if(len(data) != 0):
        for i in range(len(data)):
            string = data[i]['files']
            filename = string.decode('ASCII')
            formData.append({'firstname': data[i]['firstname'], 'lastname': data[i]['lastname'], 'email': data[i]['email'], 'userid': data[i]['userId'], 'phone': data[i]
                             ['phone'], 'employer': data[i]['employer'], 'status': data[i]['e_status'], 'files': filename, 'income': data[i]['income'], 'dob': data[i]['dob']})

    response = Response(json.dumps(
        formData), status=200, mimetype="application/json")
    return response


# @app.route('/storeLocation', methods=['GET'])
# def maps():
#     cur = mysql.connection.cursor()
#     query_string = "SELECT * FROM advertisements"
#     cur.execute(query_string)
#     data = cur.fetchall()

#     locationData = []
#     for i in range(len(data)):
#         locationData.append({'adTitle': data[i][1], 'propertyType': data[i][2],
#                              'propertyAddress': data[i][3],
#                              'propertyDescription': data[i][5],
#                              'rentAmount': data[i][6],
#                              'propertyLocation': data[i][10],
#                              'latitude': data[i][13], 'longitude': data[i][14]})

#     response = Response(json.dumps(
#         locationData), status=200, mimetype="application/json")

#     return response


# API for TODO Feature


@app.route('/todo/tasks/<id>', methods=['GET', 'POST'])
def get_all_tasks(id):
    cur = mysql.connection.cursor()

    docs = ["Financial Support evidence",
            "Id Proof",
            "Work Proof",
            "Occupations details",
            "Visa",
            "Passport"]
    cur.execute("SELECT * from docPackage_todoList where userId =%s", [id])
    rv = cur.fetchall()
    if not rv:
        for doc in docs:
            cur.execute(
                "INSERT into docPackage_todoList(userId,docType) values (%s,%s)", (id, doc))
    cur.execute(
        "SELECT * from docPackage_todoList where userId =%s and docLink is Null", [id])
    mysql.connection.commit()
    rv = cur.fetchall()
    return jsonify(rv)


@app.route('/done/task/<id>', methods=['GET'])
def get_done(id):
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT * from docPackage_todoList where userId =%s and docLink is not Null", [id])
    mysql.connection.commit()
    rv = cur.fetchall()
    return jsonify(rv)


@app.route('/todo/task', methods=['POST'])
def add_task():
    cur = mysql.connection.cursor()
    title = request.get_json()['title']
    cur.execute(
        "INSERT INTO docPackage_todoList(docType) values (%s)", [title])
    mysql.connection.commit()
    result = {'title': title}

    return jsonify({"result": result})


@app.route("/todo/tasks/<id>", methods=['PUT'])
def update_task(id):
    cur = mysql.connection.cursor()
    Link = request.get_json()['Link']
    type = request.get_json()['type']
    cur.execute(
        "UPDATE docPackage_todoList set docLink=%s where userId= %s and docType=%s", (Link, id, type))
    mysql.connection.commit()
    result = {"Link": Link}
    return jsonify({"result": result})


@app.route("/todo/task/<id>", methods=['PUT'])
def delete_task(id):
    cur = mysql.connection.cursor()
    response = cur.execute(
        "UPDATE docPackage_todoList set docLink=Null where docPackageId=%s", [id])
    mysql.connection.commit()

    if response > 0:
        result = {'message': 'record deleted'}
    else:
        result = {'message': 'no record found'}
    return jsonify({"result": result})


@app.route("/getPanelInsights", methods=['GET'])
def getPanelInsights():
    dbObject = Model()
    # Insight No. -- 1
    total_applications = len(dbObject.getPanelInsights()[1])
    # Insight No. -- 2
    num_locations = 4
    # Insight No. -- 3
    num_users = len(dbObject.getPanelInsights()[0])

    return json.dumps({"result": [
        {"totalApplications": total_applications},
        {"numLocations": num_locations},
        {"numUsers": num_users}]
    })


@app.route("/getAverageRent")
def getAverageRent():
    dbObject = Model()
    records = dbObject.getAverageRentbyLocation()
    # Calculate Average rent by city
    avgRent = {}
    for obj in records:
        city = obj[1].split(",")[0]
        if city not in avgRent:
            avgRent[city] = obj[0]
        else:
            avgRent[city] = ((avgRent[city]+obj[0])/2)
    return json.dumps({
        "result": avgRent
    })


@app.route("/getApplicationsBypropType")
def appByPropType():
    dbObject = Model()
    records = dbObject.getAppByProperty()
    propType = {}
    for obj in records:
        if obj not in propType:
            propType[obj] = 1
        else:
            propType[obj] += 1
    return json.dumps({
        "result": propType
    })


@app.route('/plotAvgRent.png')
def plot_bar_chart_average_rent():
    fig = create_figure_average_rent_graph()
    output = BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


def create_figure_average_rent_graph():
    dbObject = Model()
    records = dbObject.getAverageRentbyLocation()
    # Calculate Average rent by city
    avgRent = {}
    for obj in records:
        city = obj[1].split(",")[0]
        if city not in avgRent:
            avgRent[city] = obj[0]
        else:
            avgRent[city] = ((avgRent[city]+obj[0])/2)
    if 'Toronto' in avgRent and 'Halifax' and 'Calgary' in avgRent:
        fig = plt.figure()
        cities = ['Halifax', 'Toronto', 'Calgary']
        rent = [avgRent['Halifax'], avgRent['Toronto'], avgRent['Calgary']]

        plt.bar(cities, rent)
        plt.title("Average Rent by city for all property Types")
        plt.xlabel("Cities")
        plt.ylabel("Average Rent (CAD)")
        # plt.show()
        return fig
    else:
        fig = plt.figure()
        cities = ['Halifax', 'Toronto', 'Calgary']
        rent = [1600, 2000, 1700]

        plt.bar(cities, rent)
        plt.title("Average Rent by city for all property Types")
        plt.xlabel("Cities")
        plt.ylabel("Average Rent (CAD)")
        # plt.show()
        return fig


@app.route('/plotPropType.png')
def plot_bar_chart_property_type():
    fig = create_figure_property_type()
    output = BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


def create_figure_property_type():
    dbObject = Model()
    records = dbObject.getAppByProperty()
    propType = {'Apartment': 0, 'Condo': 0, 'House': 0, 'Room': 0}
    for obj in records:
        propType[obj] += 1

    fig = plt.figure()
    propertyType = ['Apartment', 'Room', 'House', 'Condo']
    num_prop = [propType['Apartment'], propType['Room'],
                propType['House'], propType['Condo']]

    plt.bar(propertyType, num_prop)
    plt.title("Rental Applications by Property Type")
    plt.xlabel("Property Type")
    plt.ylabel("Number of Applications")
    return fig


@app.route("/getPropImages/<aid>")
def getPropImagesByAdvertisementId(aid):
    dbObject = Model()
    records = dbObject.getPropImagesById(aid)
    return json.dumps({
        "result": records
    })


@app.route("/checkrentalApp/<aid>")
def checkPostedApplication(aid):
    dbObject = Model()
    records = dbObject.checkRentalApplicationPosted(aid)
    if len(records) != 0:
        return jsonify(
            {"result": True})
    else:
        return jsonify({"result": False})


# Create Admin API's here
@app.route("/admin/getAllAds")
def getAdminAllAdvertisements():
    dbObject = Model()
    records = dbObject.adminAllAdvertisements()

    recordsObj = []
    for record in records:
        recordsObj.append({
            'aId': record[0],
            'adTitle': record[1],
            'userId': record[2],
            'propertyType': record[3],
            'propertyAddress': record[4],
            'zipCode': record[5],
            'propertyDescription': record[6],
            'petFriendly': record[7],
            'leaseType': record[8],
            'propertyLocation': record[9],
            'contactTiming': record[10],
            'advertisementsStatus': record[11]
        })

    return jsonify({
        "record": recordsObj
    })


@app.route("/admin/updateAdStatus/<aid>", methods=['POST', 'PUT'])
def modifyAdStatus(aid):
    adStatus = request.get_json()['status']
    dbObject = Model()
    dbObject.modifyAdvertisementStatus(aid, adStatus)

    return jsonify({"result": "Status Modified Successfully"})


@app.route("/getLastAdId")
def getLastAdId():
    dbObject = Model()
    record = dbObject.getLastAdvertisementId()
    return jsonify({"aId": record})


@app.route('/storeLocation', methods=['GET'])
def maps():
    cur = mysql.connection.cursor()
    query_string = "SELECT * FROM advertisements"
    cur.execute(query_string)
    data = cur.fetchall()

    locationData = []
    for i in range(len(data)):
        locationData.append({'adTitle': data[i]['adTitle'], 'propertyType': data[i]['propertyType'],
                             'propertyAddress': data[i]['propertyAddress'],
                             'propertyDescription': data[i]['propertyDescription'],
                             'rentAmount': data[i]['rentAmount'],
                             'propertyLocation': data[i]['propertyLocation'],
                             'latitude': data[i]['latitude'], 'longitude': data[i]['longitude']})

    response = Response(json.dumps(
        locationData), status=200, mimetype="application/json")

    return response


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', debug=True)
