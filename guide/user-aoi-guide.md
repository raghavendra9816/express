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

#for sign up flow of code
-api end point (msg:user sign upccessfully)/register
-usercontroller.register()
-register controller

    1.email, password check
    2.create bcrypt utils file(generatehash ,compare hash)
    3.payload.password=generateHash(password)
    4.usermodel.create(payload)
    5.email signup(email notofocation)

    --user login
    -api endpoint (/login)
    -usercontrol.login()
    -login controller

    1.email exist ; isactive:true
    2.check email verification of user
    3.email not verified ,throw new error
    4compare password hash with user passeord
    5.if invalid throw new error
    6.return true


    email token generatoe
    -api endpoint(/generate-email-token)

    1.email exist ; isactive:true
    2.use crypto utils, to create otp(truly random otp)

    3.if not verified ,generate otp
    4.store te otp in the user database
    5.email that otp

    --email token verificaton
    -api endpoint(/verify-email-token)

    1.email exist ; isactive:true
    2.compare otp
    3.if verified ,update user database with isemailverified:true,otp:""
    4.else token is invalid


    1.
