import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL!;

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_SENDER_EMAIL) {
  throw new Error("SendGrid environment variables are missing");
}

sgMail.setApiKey(SENDGRID_API_KEY);

type sendGridData = {
  to: string | string[];
  subject: string;
  html: string;
};

export class SendGridMailer {
  static async sendMail(data: sendGridData): Promise<any> {
    const msg = {
      from: SENDGRID_SENDER_EMAIL,
      to: data.to,
      subject: data.subject,
      html: data.html,
    };
    try {
      return await sgMail.send(msg);
    } catch (error) {
      console.error("SendGrid error:", error);
      throw new Error("Failed to send email");
    }
  }
}
