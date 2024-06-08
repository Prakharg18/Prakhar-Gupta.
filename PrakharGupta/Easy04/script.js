document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('enrollment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Form submitted successfully!');
    });
});
