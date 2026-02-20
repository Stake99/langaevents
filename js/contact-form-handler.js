/**
 * Contact Form Handler
 * Handles form submission, validation, and user feedback
 * Works with Nodemailer API endpoint
 */

document.addEventListener('DOMContentLoaded', function() {
	const contactForm = document.getElementById('contact-form');
	
	if (contactForm) {
		contactForm.addEventListener('submit', handleFormSubmit);
	}
});

/**
 * Handle contact form submission
 * @param {Event} e - Form submission event
 */
function handleFormSubmit(e) {
	e.preventDefault();
	
	const form = e.target;
	const submitButton = form.querySelector('.btn-send-message');
	
	// Get values using name attributes
	const name = form.querySelector('input[name="name"]')?.value.trim();
	const email = form.querySelector('input[name="email"]')?.value.trim();
	const subject = form.querySelector('input[name="subject"]')?.value.trim();
	const message = form.querySelector('textarea[name="message"]')?.value.trim();
	
	// Validate form
	if (!validateForm(name, email, subject, message)) {
		return;
	}
	
	// Disable button and show loading state
	const originalButtonText = submitButton.value;
	submitButton.disabled = true;
	submitButton.value = 'Sending...';
	
	// Prepare form data as JSON
	const formData = {
		name: name,
		email: email,
		subject: subject,
		message: message,
		_subject: `Contact Form: ${subject}`
	};
	
	// Send data to our API endpoint
	fetch('/api/send-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(formData)
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
			form.reset();
		} else {
			throw new Error(data.error || 'Failed to send message');
		}
	})
	.catch(error => {
		console.error('Form submission error:', error);
		showErrorMessage('An error occurred. Please try again later or contact us directly at info@langaevents.com');
	})
	.finally(() => {
		// Restore button
		submitButton.disabled = false;
		submitButton.value = originalButtonText;
	});
}

/**
 * Validate form inputs
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} subject - Message subject
 * @param {string} message - Message body
 * @returns {boolean} - True if valid, false otherwise
 */
function validateForm(name, email, subject, message) {
	// Check if fields are not empty
	if (!name || !email || !subject || !message) {
		showErrorMessage('Please fill in all fields.');
		return false;
	}
	
	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		showErrorMessage('Please enter a valid email address.');
		return false;
	}
	
	// Check message length
	if (message.length < 10) {
		showErrorMessage('Message must be at least 10 characters long.');
		return false;
	}
	
	return true;
}

/**
 * Show success message to user
 * @param {string} message - Success message text
 */
function showSuccessMessage(message) {
	const alert = createAlertElement('success', message);
	insertAlert(alert);
}

/**
 * Show error message to user
 * @param {string} message - Error message text
 */
function showErrorMessage(message) {
	const alert = createAlertElement('danger', message);
	insertAlert(alert);
}

/**
 * Create alert element
 * @param {string} type - Alert type ('success' or 'danger')
 * @param {string} message - Alert message
 * @returns {HTMLElement} - Alert element
 */
function createAlertElement(type, message) {
	const alert = document.createElement('div');
	alert.className = `alert alert-${type} alert-dismissible fade in`;
	alert.setAttribute('role', 'alert');
	alert.innerHTML = `
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		${message}
	`;
	return alert;
}

/**
 * Insert alert into the form container
 * @param {HTMLElement} alert - Alert element to insert
 */
function insertAlert(alert) {
	const form = document.getElementById('contact-form');
	if (form) {
		// Remove any existing alerts
		const existingAlerts = form.querySelectorAll('.alert');
		existingAlerts.forEach(a => a.remove());
		
		// Insert new alert at the top of the form
		form.insertBefore(alert, form.firstChild);
		
		// Auto-remove alert after 5 seconds
		setTimeout(() => {
			alert.remove();
		}, 5000);
	}
}
