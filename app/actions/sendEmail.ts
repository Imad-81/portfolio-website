'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { rateLimit } from '../lib/ratelimit';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';

    const { success } = await rateLimit.limit(ip);
    if (!success) {
        return { error: 'Too many requests. Please try again later.' };
    }

    const senderName = formData.get('from_name');
    const senderEmail = formData.get('reply_to');
    const message = formData.get('message');

    if (!senderName || typeof senderName !== 'string') {
        return { error: 'Invalid sender name' };
    }
    if (!senderEmail || typeof senderEmail !== 'string') {
        return { error: 'Invalid sender email' };
    }
    if (!message || typeof message !== 'string') {
        return { error: 'Invalid message' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'shaikimaduddin10@gmail.com',
            subject: `New Message from ${senderName}`,
            replyTo: senderEmail,
            text: `Name: ${senderName}\nEmail: ${senderEmail}\nMessage:\n${message}`,
        });

        if (error) {
            return { error: error.message };
        }

        return { data };
    } catch {
        return { error: 'Failed to send email' };
    }
};
