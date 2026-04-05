# amazingheartcentre

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-a4gsgnjz)

## Deployment Setup

Use these environment variables in Netlify for the frontend:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Use these secrets in Supabase for the email functions:

- `RESEND_API_KEY`
- `ADMIN_EMAIL`

The frontend writes bookings and contact messages to Supabase, then calls the matching Edge Function to send the admin email. If you already deployed older database notification triggers, remove or disable them so emails do not send twice.
