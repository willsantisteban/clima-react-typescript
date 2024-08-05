import styles from './App.module.css'
import Form from './components/Form/Form'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'

function App() {

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
        <Form />
        <WeatherDetails />
      </div>
    </>
  )
}

export default App
