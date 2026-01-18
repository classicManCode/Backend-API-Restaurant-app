import sgMail from "@sendgrid/mail";

export class SendGridMailer {
  static async sendMail(data: {
    to: [string];
    // from: string;
    subject: string;
    html: string;
  }): Promise<any> {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    if (!sendgridApiKey) {
      throw new Error("SENDGRID_API_KEY is not defined");
    }
    sgMail.setApiKey(sendgridApiKey);

    const msg = {
      from: "legenderyprime@gmail.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
    };
    try {
      return await sgMail.send(msg);
    } catch (err) {
      throw err;
    }
  }
}
