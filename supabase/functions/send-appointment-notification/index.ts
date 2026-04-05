import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AppointmentData {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  symptoms?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const appointment: AppointmentData = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!resendApiKey || !adminEmail) {
      console.error("Missing RESEND_API_KEY or ADMIN_EMAIL environment variables");
      return new Response(
        JSON.stringify({
          error: "Email service not configured",
          message: "Please configure RESEND_API_KEY and ADMIN_EMAIL in your Supabase dashboard",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const formatTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              New Appointment Booking
            </h2>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Patient Information</h3>
              <p><strong>Name:</strong> ${appointment.patient_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${appointment.patient_email}">${appointment.patient_email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${appointment.patient_phone}">${appointment.patient_phone}</a></p>
            </div>

            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Appointment Details</h3>
              <p><strong>Date:</strong> ${formatDate(appointment.appointment_date)}</p>
              <p><strong>Time:</strong> ${formatTime(appointment.appointment_time)}</p>
              <p><strong>Service Type:</strong> ${appointment.service_type}</p>
              ${appointment.symptoms ? `<p><strong>Symptoms/Concerns:</strong><br>${appointment.symptoms}</p>` : ''}
            </div>

            <div style="background-color: #fff7ed; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0;">
                <strong>Action Required:</strong> Please review and confirm this appointment in your admin dashboard.
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              This is an automated notification from your cardiology appointment system.
            </p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Cardiology Appointments <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Appointment: ${appointment.patient_name} - ${formatDate(appointment.appointment_date)}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification sent successfully",
        emailId: result.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error sending notification:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send notification",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
