import nodemailer from "nodemailer"
import { env } from "../config/env"
const transporter = nodemailer.createTransport({
    host: env.EMAIL_SENDER_SMTP_HOST,
    port:Number(env.EMAIL_SENDER_SMTP_PORT),
    secure: Number(env.EMAIL_SENDER_SMTP_PORT) === 465,
    auth: {
        user: env.EMAIL_SENDER_SMTP_USER,
        pass:env.EMAIL_SENDER_SMTP_PASS
    }
});


export const sendVerificationEmail = async(userEmail:string , emailSubject:string , verifyUrl:string)=>{
    console.log("User Email: ", userEmail)
    console.log("Email Subject: ", emailSubject)
    console.log("Verify URL: ", verifyUrl)
    try {
        const result = await transporter.sendMail({
            from: `"Cholo Parcel " <${env.EMAIL_SENDER_SMTP_USER}>`,
            to: userEmail,
            subject: emailSubject,
            html: `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;">
                    <tr>
                        <td align="center">
                        
                        <!-- Main Container -->
                        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:30px;font-family:Arial,sans-serif;">
                            
                            <!-- Logo / Title -->
                            <tr>
                            <td align="center" style="padding-bottom:20px;">
                                <h2 style="margin:0;color:#f97316;">Cholo Parcel</h2>
                            </td>
                            </tr>

                            <!-- Heading -->
                            <tr>
                            <td align="center" style="padding-bottom:20px;">
                                <h1 style="margin:0;font-size:22px;color:#333;">Verify Your Email</h1>
                            </td>
                            </tr>

                            <!-- Message -->
                            <tr>
                            <td align="center" style="padding-bottom:25px;color:#555;font-size:14px;line-height:1.6;">
                                Thanks for signing up! Please confirm your email address by clicking the button below.
                            </td>
                            </tr>

                            <!-- Button -->
                            <tr>
                            <td align="center" style="padding-bottom:30px;">
                                <a href="${verifyUrl}" 
                                style="background:#f97316;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:bold;display:inline-block;">
                                Verify Email
                                </a>
                            </td>
                            </tr>

                            <!-- Fallback Link -->
                            <tr>
                            <td align="center" style="font-size:12px;color:#888;word-break:break-all;">
                                Or copy and paste this link into your browser:<br/>
                                <a href="${verifyUrl}" style="color:#f97316;">${verifyUrl}</a>
                            </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                            <td align="center" style="padding-top:30px;font-size:12px;color:#aaa;">
                                © ${new Date().getFullYear()} Cholo Parcel. All rights reserved.
                            </td>
                            </tr>

                        </table>

                        </td>
                    </tr>
                    </table>
                    `
        })
      //  console.log("Email sent successfully: ", result)
    } catch (error:any) {
        console.log("Email send error: ", error)
        throw new Error(error.message ? error.message : "Email send error: " + error)
    }
}