import { Resend } from 'resend';
import { render } from 'react-email';
import WelcomeEmail from '../../../emails/WelcomeEmail'; 
import { Html, Body, Container, Text } from '@react-email/components';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const emailHtml = render(<WelcomeEmail />);
    const data = await resend.emails.send({
       from: "onboarding@resend.dev", 
       to: ["delivered@resend.dev"],
      subject: '测试邮件',
      html: emailHtml,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}