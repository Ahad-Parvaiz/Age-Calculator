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

  if (year < 1900 || year > new Date().getFullYear()) {
      showError("Year must be between 1900 and current year");
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

  if (birthDate > today) {
      showError("Birth date cannot be in the future");
      return;
  }

  // Calculate age
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust for negative days/months
  if (ageDays < 0) {
      ageMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonth.getDate();
  }

  if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
  }

  // Calculate total days
  const diffTime = Math.abs(today - birthDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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

// Input validation
document.getElementById('day').addEventListener('input', function () {
  const val = parseInt(this.value);
  if (val > 31) this.value = 31;
  if (val < 1 || isNaN(val)) this.value = '';
});

document.getElementById('year').addEventListener('input', function () {
  // Allow only digits
  this.value = this.value.replace(/\D/g, '');
});
