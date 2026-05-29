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

async function insertRow<T extends Record<string, unknown>>(
	tableName: string,
	row: T
) {
	if (!isSupabaseConfigured) {
		throw new Error(
			'Supabase environment variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
		);
	}

	const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'omit',
		cache: 'no-store',
		headers: {
			apikey: supabaseKey,
			Authorization: `Bearer ${supabaseKey}`,
			'Content-Type': 'application/json',
			Prefer: 'return=minimal',
		},
		body: JSON.stringify(row),
	});

	if (!response.ok) {
		let errorMessage = `Failed to insert into ${tableName}`;

		try {
			const errorBody = await response.json();
			errorMessage = errorBody?.message || errorBody?.error || errorMessage;
		} catch {
			const errorText = await response.text();
			if (errorText) {
				errorMessage = errorText;
			}
		}

		throw new Error(errorMessage);
	}

	return null;
}

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

export function insertAppointmentRequest(
	row: Record<string, unknown>
) {
	return insertRow('appointments', row);
}

export function insertContactSubmission(row: Record<string, unknown>) {
	return insertRow('contact_submissions', row);
}
