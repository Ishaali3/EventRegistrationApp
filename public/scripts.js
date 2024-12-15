// Handle registration
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const userName = document.getElementById('userName').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventName, userName })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('eventName').value = '';
        document.getElementById('userName').value = '';
    });
});

// Handle cancel registration
document.getElementById('cancel-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventName = document.getElementById('cancelEventName').value;
    const userName = document.getElementById('cancelUserName').value;

    fetch('/cancel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventName, userName })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('cancelEventName').value = '';
        document.getElementById('cancelUserName').value = '';
    });
});

// View attendees
document.getElementById('view-attendees').addEventListener('click', function() {
    fetch('/attendees')
        .then(response => response.json())
        .then(data => {
            const attendeesList = document.getElementById('attendees-list');
            attendeesList.innerHTML = '';
            data.forEach(attendee => {
                const li = document.createElement('li');
                li.textContent = `${attendee.userName} registered for ${attendee.eventName}`;
                attendeesList.appendChild(li);
            });
        });
});
