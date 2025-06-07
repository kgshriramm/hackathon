// Show the modal and populate the hidden “scheme” field
function handleApply(schemeName) {
  const modal = document.getElementById('applyFormModal');
  modal.style.display = 'flex';
  document.getElementById('formTitle').innerText = `Apply for: ${schemeName}`;
  document.getElementById('schemeInput').value = schemeName;
}

// Close modal
function closeForm() {
  document.getElementById('applyFormModal').style.display = 'none';
}

// Close modal if clicked outside modal content
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("applyFormModal");
  const modalContent = modal.querySelector(".modal-content");

  modal.addEventListener("click", function (event) {
    if (!modalContent.contains(event.target)) {
      closeForm();
    }
  });

  // Optional: Close modal on ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeForm();
    }
  });
});

// Intercept form submission, POST to /api/apply
document.getElementById('applyForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    

    if (response.ok) {
      alert('Application submitted successfully!');
      this.reset();
      closeForm();
    } else {
      alert('Failed to submit application.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred.');
  }
});

