const sendMail = require("../utils/sendMail");

const contactController = {
  submitContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Send email to admin
      const adminEmail = process.env.ADMIN_EMAIL || "admin@karthub.com";
      const emailSubject = `New Contact Form Submission: ${subject}`;
      const emailMessage = `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `;

      await sendMail({
        email: adminEmail,
        subject: emailSubject,
        message: emailMessage,
      });

      // Send confirmation email to user
      const userSubject = "Thank you for contacting KartHub";
      const userMessage = `
        Dear ${name},

        Thank you for contacting KartHub. We have received your message and will get back to you shortly.

        Best regards,
        The KartHub Team
      `;

      await sendMail({
        email: email,
        subject: userSubject,
        message: userMessage,
      });

      res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }
  },
};

module.exports = contactController; 