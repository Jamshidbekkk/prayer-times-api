function getPrayerTimes() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    const apiUrl = `https://islomapi.uz/api/present/day?region=${city}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        displayPrayerTimes(data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch prayer times. Please try again later.');
      });
  }

  function displayPrayerTimes(data) {
    const prayerTimesDiv = document.getElementById('prayerTimes');
    prayerTimesDiv.innerHTML = '';

    const prayerTimes = data.times;
    const cityName = data.region;

    const header = document.createElement('h3');
    header.textContent = `Prayer Times for ${cityName}`;
    prayerTimesDiv.appendChild(header);

    const list = document.createElement('ul');
    list.classList.add('list-group');

    for (const prayer in prayerTimes) {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerHTML = `<strong>${prayer}:</strong> ${prayerTimes[prayer]}`;
      list.appendChild(listItem);
    }

    prayerTimesDiv.appendChild(list);
  }