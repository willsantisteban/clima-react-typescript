import { create } from "zustand"
import { SearchType, Weather } from "../types"
import axios from "axios"
import { z } from "zod"
//import { object, string, number, InferOutput, parse } from 'valibot'
export type WeatherState = {
    weather: Weather | null,
    loading: boolean,
    notFoundData: boolean,
    getWeatherByCityCountry: (search: SearchType) => Promise<void>
}

//Type Guards - comprueba el objeto real que se esta devolviendo de la respuesta de un servicio.
//la desventaja es que no es un codigo mantenible
// const isWeatherResult = (weather : unknown) : weather is Weather => {
//     return(
//         Boolean(weather) && typeof weather === 'object' && 
//             typeof (weather as Weather).name && 
//             typeof (weather as Weather).main.temp === 'number'&& 
//             typeof (weather as Weather).main.temp_max === 'number'&& 
//             typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

//Utilizando la libreria Zod:
//La desventaja de zod es que todo depende de z y no es modular.. otra opción es Valivot
const weatherZod = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
});
type weatherZod = z.infer<typeof weatherZod>

//Valibot
// const weatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// });
// type weatherValibot = InferOutput<typeof weatherSchema>

export const useWeatherStore = create<WeatherState>((set) => ({
    weather: null,
    loading: true,
    notFoundData: false,
    getWeatherByCityCountry: async (search: SearchType) => {
        const API_KEY = import.meta.env.VITE_WEATHERMAP_API_KEY;

        try{
            const { data } = await 
                axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`);
            if(data) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const {data: weatherApi} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                const result = weatherZod.safeParse(weatherApi);
                if(result.success) {
                    set((state) => ({ weather: (state.weather = result.data), loading: false, notFoundData: false}));
                }
            }
        } catch (err) {
            set((state) => ({ weather: (state.weather = null), loading: false, notFoundData: true}))
        }
    }
}))