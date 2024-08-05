import { countries } from "../../data/countries";
import styles from './Form.module.css';
import { SearchType } from "../../types";
import { useForm } from "react-hook-form";
import Alert from "../Alert/Alert";
import { useWeatherStore } from "../../store/weatherStore";

export default function Form() {
    const {register, handleSubmit, formState: {errors}} = useForm<SearchType>();
    const getWeatherByCityCountry = useWeatherStore(state => state.getWeatherByCityCountry);

    const registerForm = (search: SearchType) => {
        getWeatherByCityCountry(search);
    };

    return (
        <form className={styles.form}
            noValidate
            onSubmit={handleSubmit(registerForm)}>
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    className={styles.input}
                    id="city"
                    type="text"
                    placeholder="Ciudad"
                    {...register('city', {
                        required: 'El campo Ciudad es requerido'
                    })}
                />
                {errors.city && (
                    <Alert>{errors.city?.message}</Alert>
                )}
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Pais:</label>
                <select
                    id="country"
                    {...register('country', {
                        required: 'El campo Pais es requerido'
                    })}
                >
                    <option value="">-- Seleccione un pais --</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.country && (
                    <Alert>{errors.country?.message}</Alert>
                )}
            </div>

            <input
                className={styles.submit}
                type="submit"
                value={'Consultar clima'} />
        </form>
    )
}
