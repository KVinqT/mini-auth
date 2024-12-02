import transporter from "@config/email-transporter";

const sendMail = async (mailDetails: any) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    return info;
  } catch (error) {
    console.log(error);
  }
};
export default sendMail;
