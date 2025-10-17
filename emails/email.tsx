import * as React from 'react';
import { Html, Body, Container, Heading, Paragraph } from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading style={{ fontSize: '24px', color: '#333' }}>欢迎使用我们的产品！</Heading>
          <Paragraph style={{ margin: '16px 0' }}>
            您好，{name}，感谢您加入我们～
          </Paragraph>
        </Container>
      </Body>
    </Html>
  );
}