document.addEventListener('DOMContentLoaded', function() {
    var selectedContainer = null; // Tiene traccia del contenitore selezionato

    // Ottiene l'input per la nota
    var noteInput = document.getElementById('noteInput');

    // Gestisce l'evento di input per creare post-it nel contenitore selezionato
    noteInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            var text = noteInput.value;
            if (text.trim() !== '' && selectedContainer != null) {
                addPostIt(text, selectedContainer.getAttribute('data-type'));
                noteInput.value = ''; // Pulisce l'input dopo l'inserimento
            }
        }
    });

    // Aggiunge l'evento di click ai contenitori per selezionarli
    var containers = document.querySelectorAll('.container');
  containers.forEach(function(container) {
    container.addEventListener('click', function() {
        if (selectedContainer) {
            selectedContainer.classList.remove('selected'); // Rimuove la classe dal precedente contenitore selezionato
        }
        selectedContainer = this;
        selectedContainer.classList.add('selected'); // Aggiunge la classe al contenitore corrente
    });
});


    function addPostIt(text, type) {
        // Utilizza il contenitore selezionato per aggiungere il post-it
        var container = selectedContainer;
        if (!container) {
            console.error('Nessun contenitore selezionato');
            return;
        }

        // Crea il post-it
        var postIt = document.createElement('div');
        postIt.classList.add('post-it');
        postIt.textContent = text;

        // Gestione del click sul post-it per cambiarne lo stato
        postIt.addEventListener('click', function() {
            this.classList.toggle('sbarrato');
        });

        // Aggiunge il post-it al contenitore corretto
        container.appendChild(postIt);
    }
});

document.querySelectorAll('.color-choice').forEach(item => {
    item.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        document.body.style.backgroundColor = color;
    });
});

fetch('https://api.openweathermap.org/data/2.5/weather?q=bologna&appid=6833c466127dc6aef13e1a3ea17ca3e3&units=metric')
    .then(response => response.json())
    .then(data => {
        const city = data.name;
        const weather = `${data.weather[0].main}, ${data.main.temp}°C`;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`; // Costruisce l'URL dell'icona

        document.getElementById('city').textContent = `${city}`;
        document.getElementById('weather').textContent = ` ${weather}`;
        document.getElementById('weather-icon').src = iconUrl; // Imposta l'URL dell'icona
    })
    .catch(error => console.error('Error fetching weather data:', error));