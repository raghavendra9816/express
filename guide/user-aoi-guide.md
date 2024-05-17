## #user sign up

-database user record save
-nodemailer service module
-async await nodemailer service
email from req.body ,send welcome
user email{event or async asait}

#user login
--input req.body=>email,password
-if email and password doesnt match =>throw error

    ooutput=>jwt token

#user list api (admin)
-if user is admin shoe list of users
-if user is not admin, throw unauthorized

-how?? by using token; by sending jwt token through headers.
