import mysql.connector as mysql


class Model:
    def __init__(self):
        self.hostname = "database-2.cigxoyp3dem3.us-east-1.rds.amazonaws.com"
        self.username = "admin"
        self.password = "rentickly"
        self.dbName = "rentickly"

        self.dbConnection = mysql.connect(
            host=self.hostname,
            user=self.username,
            passwd=self.dbName,
            database=self.dbName
        )

    def getUserId(self, email):
        dbCursor = self.dbConnection.cursor()
        query = f"select userId from Users where email= '{email}'"
        dbCursor.execute(query)
        records = dbCursor.fetchone()
        self.dbConnection.close()
        return records[0]

    def getUsers(self):
        dbCursor = self.dbConnection.cursor()
        query = "select * from Users"
        dbCursor.execute(query)

        records = dbCursor.fetchall()

        self.dbConnection.commit()
        self.dbConnection.close()
        return records

    def postAdvertisement(self, adObject):
        dbCursor = self.dbConnection.cursor()

        email = adObject['email']
        email_query = f"select userId from Users where email= '{email}'"
        dbCursor.execute(email_query)
        email_record = dbCursor.fetchone()
        adObject['userId'] = email_record[0]

        query = "INSERT INTO advertisements (adTitle, propertyType, \
                propertyAddress, zipCode, rentAmount, \
                propertyDescription, petFriendly, userId, leaseType, \
                propertyLocation, contactTiming, advertisementsStatus, latitude, longitude ) \
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

        values = (adObject['adTitle'], adObject['propertyType'], adObject['streetAddress'],
                  adObject['propertyZipCode'], adObject['rentAmount'], adObject['propertyDescription'],
                  adObject['petFriendly'], adObject['userId'],
                  adObject['leaseType'], adObject['propertyLocation'], adObject['contactTiming'], "submitted",
                  adObject['latitude'], adObject['longitude']
                  )

        dbCursor.execute(query, values)

        self.dbConnection.commit()
        last_row_id = dbCursor.lastrowid
        self.dbConnection.close()
        return last_row_id

    def updateAdvertisement(self, adObject):
        dbCursor = self.dbConnection.cursor()

        query = "SET FOREIGN_KEY_CHECKS=0"
        dbCursor.execute(query)

        query = f"UPDATE advertisements set adTitle='{adObject['adTitle']}',propertyType='{adObject['propertyType']}', \
                propertyAddress='{adObject['streetAddress']}', zipCode='{adObject['propertyZipCode']}', rentAmount ='{adObject['rentAmount']}', \
                propertyDescription='{adObject['propertyDescription']}', petFriendly='{adObject['petFriendly']}', userId='{adObject['userId']}', leaseType='{adObject['leaseType']}', \
                propertyLocation='{adObject['propertyLocation']}', contactTiming='{adObject['contactTiming']}', advertisementsStatus='submitted', latitude='{adObject['latitude']}', longitude='{adObject['longitude']}' \
                where aId='{adObject['aId']}'"
        dbCursor.execute(query)

        query = "SET FOREIGN_KEY_CHECKS=1"
        dbCursor.execute(query)

        self.dbConnection.commit()
        self.dbConnection.close()

    def getAdvertisement(self, email):
        dbCursor = self.dbConnection.cursor()

        email_query = f"select userId from Users where email= '{email}'"
        dbCursor.execute(email_query)
        email_record = dbCursor.fetchone()
        userId = email_record[0]

        query = f"select aId, adTitle, userId, propertyType, propertyAddress, zipCode, propertyDescription, \
                petFriendly, leaseType, rentAmount, propertyLocation, contactTiming, advertisementsStatus  \
                from advertisements where userId='{userId}'"
        dbCursor.execute(query)
        records = dbCursor.fetchall()

        self.dbConnection.commit()
        self.dbConnection.close()
        return records

    def adminAllAdvertisements(self):
        dbCursor = self.dbConnection.cursor()
        query = f"select aId, adTitle, userId, propertyType, propertyAddress, zipCode, propertyDescription, \
            petFriendly, leaseType, propertyLocation, contactTiming, advertisementsStatus  \
            from advertisements"
        dbCursor.execute(query)
        records = dbCursor.fetchall()

        self.dbConnection.commit()
        self.dbConnection.close()
        return records

    def ViewReview(self, aid):
        userId = []
        newRecords = []
        dbCursor = self.dbConnection.cursor()
        query = f"select * from Review where aId = '{aid}'"
        dbCursor.execute(query)
        records = dbCursor.fetchall()

        # self.dbConnection.close()

        for record in records:
            newRecords.append(list(record))

        for a in records:
            userId.append(a[4])

        # dbCursor = self.dbConnection.cursor()
        # print(newRecords)
        for i in range(len(userId)):
            query = f"select * from Users where userId = '{userId[i]}'"
            dbCursor.execute(query)
            record_userID = dbCursor.fetchone()
            newRecords[i].append(record_userID[1])
        self.dbConnection.close()

        return newRecords

    def getPanelInsights(self):
        dbCursor = self.dbConnection.cursor()
        # Get Total Users 
        user_query = "select * from Users"
        dbCursor.execute(user_query)
        user_records = dbCursor.fetchall() 

        # Get All advertisements 
        ad_query = "select * from advertisements"
        dbCursor.execute(ad_query)
        ad_records = dbCursor.fetchall()

        return [user_records, ad_records]
    
    def getAverageRentbyLocation(self):
        dbCursor = self.dbConnection.cursor()
        # Get average rent by city and location 
        query = "select rentAmount, propertyLocation from advertisements"
        dbCursor.execute(query)
        records = dbCursor.fetchall()

        return records 

    def getAppByProperty(self):
        dbCursor = self.dbConnection.cursor() 
        query = "select propertyType from advertisements inner join rentalApplication on advertisements.aId = rentalApplication.aId"
        dbCursor.execute(query)
        records = dbCursor.fetchall()
        records = list(map(lambda x: x[0], records))
        return records 

    def insertPropImages(self, id, imageUrls):
        dbCursor = self.dbConnection.cursor()
        query = "SET FOREIGN_KEY_CHECKS=0"
        dbCursor.execute(query)
        self.dbConnection.commit() 
        
        for url in imageUrls:   
            query = "INSERT into propImages (aId, propImage) VALUES (%s, %s)"
            values = (id, url)
            dbCursor.execute(query, values)
            self.dbConnection.commit() 

        query = "SET FOREIGN_KEY_CHECKS=1"
        dbCursor.execute(query)
        self.dbConnection.commit() 

        self.dbConnection.close()  

    def getPropImagesById(self, aId):
        cursor = self.dbConnection.cursor() 
        query = f"select propImage from propImages where aId='{aId}'"
        cursor.execute(query)
        records = cursor.fetchall()
        records = list(map(lambda x: x[0], records))

        self.dbConnection.commit()
        self.dbConnection.close() 

        return records 
    
    def checkRentalApplicationPosted(self, aid):
        dbCursor = self.dbConnection.cursor() 
        query =f"select * from rentalApplication where aId='{aid}'"
        dbCursor.execute(query) 
        records = dbCursor.fetchall() 
        
        self.dbConnection.commit()
        self.dbConnection.close() 

        return records 

    def modifyAdvertisementStatus(self, aId, status):
        dbCursor = self.dbConnection.cursor()
        query = f"update advertisements set advertisementsStatus='{status}' where aId='{aId}'"
        dbCursor.execute(query)

        self.dbConnection.commit()
        self.dbConnection.close() 

    def deleteAdvertisement(self, aId):
        dbCursor = self.dbConnection.cursor() 
        # Deleting from all tables first 
        query = f"delete from rentalApplication where aId={aId}"
        dbCursor.execute(query)

        query = f"delete from Review where aId={aId}"
        dbCursor.execute(query)

        query = f"delete from bookAppointment where aId={aId}"
        dbCursor.execute(query)

        query = f"delete from propImages where aId={aId}"
        dbCursor.execute(query)

        query = f"delete from advertisements where aId={aId}"
        dbCursor.execute(query)

        self.dbConnection.commit()
        self.dbConnection.close() 

    def getLastAdvertisementId(self):
        dbCursor = self.dbConnection.cursor()

        query = "select aId from advertisements order by aId desc limit 1"
        dbCursor.execute(query) 
        record = dbCursor.fetchone() 
        
        self.dbConnection.commit()
        self.dbConnection.close()
        if record:
            return record[0]
        else:
            return -1
