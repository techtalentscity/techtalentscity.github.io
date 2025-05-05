// Updated form submission code with proper Google Form integration
const handleSubmit = async (values) => {
  if (!captchaVerified) {
    message.error('Please verify you are human by solving the math problem');
    return;
  }

  try {
    setLoading(true);
    
    console.log('Form values to submit:', values);
    
    // Create a FormData object for more reliable form submission
    const formData = new FormData();
    
    // Add form fields with the EXACT entry IDs from the Google Form
    // These should match what you see in the form URL or by inspecting the form
    formData.append('entry.2120631500', values.firstName); // First Name
    formData.append('entry.976572827', values.lastName);   // Last Name
    formData.append('entry.721402290', values.email);      // Email Address
    formData.append('entry.1212098036', values.phone);     // Contact No
    formData.append('entry.2063377438', values.fieldOfStudy); // Field of Study
    
    console.log('Submitting to Google Form...');
    
    // Option 1: Direct form submission (more compatible with Google Forms)
    const formElement = document.createElement('form');
    formElement.method = 'POST';
    formElement.action = googleFormURL;
    formElement.target = '_blank'; // This will open the response in a new tab
    
    // Add all form fields
    formData.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      formElement.appendChild(input);
    });
    
    // Add the form to the body and submit
    document.body.appendChild(formElement);
    formElement.submit();
    
    // Option 2: Using fetch as a backup approach
    // This is a fallback in case the form submission doesn't work
    try {
      // Allow the form submission to complete first
      setTimeout(async () => {
        try {
          // Use fetch as a backup method
          const response = await fetch(googleFormURL, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin requests to Google Forms
            body: formData
          });
          
          console.log('Fetch backup completed');
          
          // Show success message
          message.success('Registration submitted successfully!');
          
          // Redirect to Discord after a brief delay
          setTimeout(() => {
            console.log('Redirecting to Discord...');
            window.location.href = discordURL;
          }, 2000);
          
        } catch (fetchError) {
          console.error('Fetch backup failed:', fetchError);
          // Still try to redirect even if the fetch fails
          message.success('Registration submitted! Redirecting to Discord...');
          window.location.href = discordURL;
        }
      }, 1000);
    } catch (backupError) {
      console.error('Error in backup submission:', backupError);
    }
    
    // Remove the form from the DOM
    setTimeout(() => {
      if (document.body.contains(formElement)) {
        document.body.removeChild(formElement);
      }
    }, 2000);
    
    // Clear the form
    form.resetFields();
    
    // Reset the captcha
    setCaptchaVerified(false);
    generateMathProblem();
    
  } catch (error) {
    console.error('Error submitting form:', error);
    message.error('Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
