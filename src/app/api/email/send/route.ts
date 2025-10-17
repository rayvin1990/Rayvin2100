import { render } from 'react-email';
import { WelcomeEmail } from '../../../../emails/WelcomeEmail';

const html = render(<WelcomeEmail name="用户名称" />);
console.log(html); 