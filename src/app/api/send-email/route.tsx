import { Resend } from 'resend';
import { render } from 'react-email';
import { WelcomeEmail } from '../../../../emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY); 

async function sendWelcomeEmail() {
  const emailHtml = render(<WelcomeEmail name="用户名称" />);
  try {
    const data = await resend.emails.send({
      from: '你的发件邮箱@xxx.com', 
      to: ['收件人邮箱@xxx.com'],
      subject: '欢迎邮件',
      html: emailHtml,
    });
    console.log(data); // 发送成功的响应
  } catch (error) {
    console.error(error);
  }
}

sendWelcomeEmail();