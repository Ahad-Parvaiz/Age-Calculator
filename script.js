function calculateAge() {
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  
  const errorElement = document.getElementById('error-message');
  const resultElement = document.getElementById('result');
  
  // Reset display
  errorElement.style.display = 'none';
  resultElement.style.display = 'none';
  
  // Validate inputs
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
      showError("Please fill in all fields");
      return;
  }
  
  // Create date objects
  const today = new Date();
  const birthDate = new Date(year, month, day);
  
  // Validate date
  if (
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month ||
      birthDate.getFullYear() !== year
  ) {
      showError("Please enter a valid date");
      return;
  }
  
  // Check if birth date is in the future
  if (birthDate > today) {
      showError("Birth date cannot be in the future");
      return;
  }
  
  // Calculate age
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();
  
  // Calculate total days
  const diffTime = Math.abs(today - birthDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Adjust for negative months/days
  if (ageDays < 0) {
      ageMonths--;
      // Get the last day of the previous month
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
  }
  
  if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
  }
  
  // Display results
  document.getElementById('years').textContent = ageYears;
  document.getElementById('months').textContent = ageMonths;
  document.getElementById('days').textContent = ageDays;
  document.getElementById('total-days').textContent = `That's ${diffDays.toLocaleString()} days in total!`;
  
  resultElement.style.display = 'block';
}

function showError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Add input validation
document.getElementById('day').addEventListener('input', function() {
  if (this.value > 31) this.value = 31;
  if (this.value < 1) this.value = '';
});

document.getElementById('year').addEventListener('input', function() {
  const currentYear = new Date().getFullYear();
  if (this.value > currentYear) this.value = currentYear;
  if (this.value < 1900) this.value = 1900;
});