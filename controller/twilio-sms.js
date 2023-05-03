const TWILIO_ACCOUNT_SID = "AC87d4ad62f38b5decd08e6a8e972bb63a"
const TWILIO_AUTH_TOKEN = "c023c5d935e7e585244e29297a9c2dd3"
const TWILIO_SERVICE_SID = "VAd04e2b9f5cefe92300d9880f5c6685d5"
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
})

const sendOTP = async (req, res) =>{
        const { countryCode, phoneNumber } = req.body;
        const number = "+".concat(countryCode, phoneNumber);
        console.log(number)
        try{
            const otpResponse = await client.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
                to: number,
                channel: "sms"
            });
           res.status(200).send('OTP sent successfully')
        }
        catch (error){
            res.status(error?.status || 400).send(error?.message || "Something went wrong :)")
        }

    };

const verifyOTP = async (req, res) =>{
    const { countryCode, phoneNumber, otp } = req.body;
    const number = "+".concat(countryCode, phoneNumber);
    console.log(number)
    console.log(otp)
    try{
        //let otpResponse;
        const verifiedResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)

            .verificationChecks.create({ to: number, code: otp })
        res.status(200).send('OTP verified successfully')
    }
    catch (error){
        res.status(error?.status || 400).send(error?.message || "Something went wrong :)")
    }

};
module.exports = { sendOTP, verifyOTP };