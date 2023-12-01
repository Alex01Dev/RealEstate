alert("Aqui va a dibujar el mapa");

(function () {
    const lat = 20.239635;
    const lng = -97.954613;
    const map = L.map('map').setView([lat, lng], 16);  // Corregido el formato de setView
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> Contributors'
    }).addTo(map);
})();


// (function(){
//     const lat = 20.239635;
//     const lng = -97.954613;
//     const map = L.map('map').setView({lat,lng},16);
//     L.tileLayer('https://{s}.tile.openstreet.map.org/{z}/{x}/{y}.png',{
//         attribution:'&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> Contributors'}).addTo(map)
// })();