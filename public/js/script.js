// Form validation patterns
const patterns = {
    telephone: /^[\d\s-+()]{10,}$/,
    ninumber: /^[A-Z]{2}[0-9]{6}[A-Z]$/i,
    sortCode: /^\d{6}$/,
    accountNumber: /^\d{8}$/
};

// Error messages
const errorMessages = {
    telephone: "Please enter a valid telephone number",
    ninumber: "Please enter a valid National Insurance Number (e.g., AB123456C)",
    sortCode: "Please enter a valid 6-digit sort code",
    accountNumber: "Please enter a valid 8-digit account number",
    required: "This field is required"
};

// Get the form and modal elements
const form = document.getElementById('onboardingForm');
const modal = document.getElementById('successModal');
const sections = document.querySelectorAll('.form-section');

// Add validation to all required inputs
function setupValidation() {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentNode.appendChild(errorDiv);

        // Add input validation
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });
}

// Validate individual input
function validateInput(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Check if field is required and empty
    if (input.required && !input.value.trim()) {
        isValid = false;
        errorMessage = errorMessages.required;
    }
    // Check pattern validation for specific fields
    else if (patterns[input.id] && !patterns[input.id].test(input.value)) {
        isValid = false;
        errorMessage = errorMessages[input.id];
    }

    // Show/hide error message
    errorDiv.textContent = errorMessage;
    errorDiv.classList.toggle('show', !isValid);
    input.classList.toggle('invalid', !isValid);

    return isValid;
}

// Validate entire form
function validateForm() {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Log form data (for demonstration)
        console.log('Form submitted:', data);
        
        // Show success modal with animation
        showModal();
        
        // Reset form
        form.reset();
        
        // Clear any error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.classList.remove('show'));
    }
}

// Show success modal
function showModal() {
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
}

// Add hover effect to form sections
sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'translateY(-2px)';
        section.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'translateY(0)';
        section.style.boxShadow = 'none';
    });
});

// Initialize form validation
setupValidation();

// Add form submit handler
form.addEventListener('submit', handleSubmit);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});