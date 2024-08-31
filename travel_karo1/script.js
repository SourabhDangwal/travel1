ddocument.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;

    fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, date })
    })
    .then(response => response.json())
    .then(data => {
        let driversList = '<h3>Available Drivers</h3>';
        if (data.length > 0) {
            data.forEach(driver => {
                driversList += `
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5 class="card-title">${driver.name}</h5>
                            <p class="card-text">Rating: ${driver.rating} stars</p>
                            <p class="card-text">Available on: ${driver.availableDate}</p>
                            <button class="btn btn-primary">Book Now</button>
                        </div>
                    </div>`;
            });
        } else {
            driversList += '<p>No drivers available for the selected date and location.</p>';
        }
        document.getElementById('driversList').innerHTML = driversList;
    });
});
