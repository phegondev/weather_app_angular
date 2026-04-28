//app/environments/environments.ts 
export const environment = {
    weatherApiKey: (import.meta as any).env.NG_APP_WEATHER_API_KEY,
    weatherApiUrl: (import.meta as any).env.NG_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
}