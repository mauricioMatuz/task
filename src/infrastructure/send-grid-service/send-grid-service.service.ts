import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendGridServiceService {
  constructor(private readonly configService: ConfigService) {}
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const apiKey = this.configService.get<string>(process.env.API_EMAIL_SEND);

    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: 'matamau96@gmail.com' }, // Replace with your SendGrid verified email
        subject,
        content: [{ type: 'text/plain', value: content }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('SendGrid response:', response.data);
  }
}
