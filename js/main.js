const search = document.getElementById('search');
search.addEventListener('keyup', function () {
    if (search.value.trim().length > 2) {
        const api = `http://api.weatherapi.com/v1/forecast.json?key=d3b03b46480c4891b68183846240912&q=${search.value.trim()}&days=3`
        get(api)
    }
})
async function get(api) {
    try {
        const response = await fetch(api)
        if (!response.ok) throw new Error('Failed to fetch data.')
        const result = await response.json()
        display(result)
    } catch (error) {
        console.error('Error', error)
        document.getElementById('cards').innerHTML = `<p class="text-danger">Unable to fetch weather data. Please try again.</p>`
    }
}
function display(result) {
    const { location, forecast } = result
    box = ''
    forecast.forecastday.forEach(day => {
        box += `
        <div class="col-lg-4 ">
                        <div class="item rounded-3  text-white">
                            <div
                                class="d-flex justify-content-between header px-2 pt-2 mb-4">
                                <p>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                <p>${day.date}</p>
                            </div>
                            <h4 class="ps-3">${location.name}</h4>
                            <h1 class="ps-3 fw-bold">${day.day.maxtemp_c}°C</h1>
                            <h3 class="ps-3 fw-bold">${day.day.mintemp_c}°C</h3>
                            <img src='${day.day.condition.icon}' alt='${day.day.condition.text}' class='my-2'
                            <span class="ps-3 text-info ">${day.day.condition.text}</span>
                            <div
                                class="d-flex justify-content-around mt-3  px-2 pb-4 ">
                                <div>
                                    <i class="fa-solid fa-umbrella"></i>
                                    <span>${day.day.daily_chance_of_rain || 0}%</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-wind"></i>
                                    <span>${day.day.maxwind_kph}km\h</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-compass"></i>
                                    <span>${day.day.avgvis_km}km visibility</span>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    });
    document.getElementById('cards').innerHTML = box
}