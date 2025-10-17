import * as React from 'react';

export default function WelcomeEmail() {
  return (
    <html>
      <body style={{ fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ fontSize: '24px', color: '#333' }}>Hello from React Email!</h1>
          <p style={{ margin: '16px 0' }}>这是一个测试邮件模板～</p>
        </div>
      </body>
    </html>
  );
}