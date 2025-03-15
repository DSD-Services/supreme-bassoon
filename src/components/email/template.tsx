'use client';

import toast from "react-hot-toast";

async function sendEmail() {
  try {
    const response = await fetch('/api/mailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'email@example.com', // Update this to your email address
        subject: 'New Work Order',
        text: 'You have a new work order. Please check your schedule.'
      })
    });

    const data = await response.json();
    if (data.success) {
      toast.success('Email sent successfully!');
    } else {
      toast.error(`Failed to send email: ${data.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred while sending the email.');
  }
}

export default function Template() {
  return (
    <div className="m-4">
      <h1>Send Test Email</h1>
      <button onClick={sendEmail} className="bg-amber-950 text-white p-2 rounded">Send Email</button>
    </div>
  );
}
