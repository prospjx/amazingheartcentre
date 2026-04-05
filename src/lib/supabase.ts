import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const fallbackSupabaseUrl = 'https://example.supabase.co';
const fallbackSupabaseAnonKey = 'public-anon-key-placeholder';

if (!isSupabaseConfigured) {
	console.warn(
		'Supabase environment variables are missing. Running in local fallback mode.'
	);
}

export const supabase = createClient(
	isSupabaseConfigured ? supabaseUrl : fallbackSupabaseUrl,
	isSupabaseConfigured ? supabaseKey : fallbackSupabaseAnonKey
);

export { isSupabaseConfigured };

type AppointmentNotificationPayload = {
	patient_name: string;
	patient_email: string;
	patient_phone: string;
	appointment_date: string;
	appointment_time: string;
	service_type: string;
	symptoms?: string;
};

type ContactNotificationPayload = {
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
};

async function invokeNotificationFunction(
	functionName: string,
	body: AppointmentNotificationPayload | ContactNotificationPayload
) {
	if (!isSupabaseConfigured) {
		return { skipped: true };
	}

	const { error, data } = await supabase.functions.invoke(functionName, {
		body,
	});

	if (error) {
		throw error;
	}

	return data;
}

export function sendAppointmentNotification(
	payload: AppointmentNotificationPayload
) {
	return invokeNotificationFunction('send-appointment-notification', payload);
}

export function sendContactNotification(payload: ContactNotificationPayload) {
	return invokeNotificationFunction('send-contact-notification', payload);
}
