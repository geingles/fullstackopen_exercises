import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'
import CountryFilter from './Utils'
import Filter from './components/Filter'

function App() {
  const [countryList, setCountryList] = useState([])
  const [searchName, setSearchName] = useState('')
  const [results, setResults] = useState([])

  const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  //const countryUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${searchName}`

  useEffect(() => {
    axios
      .get(allCountriesUrl)
      .then(response => {
        setCountryList(response.data)
      })
      .catch(error => {
        setCountryList([])
      })
  }, [])

  /*useEffect(() => {
    console.log('url...', countryUrl)
    axios
      .get(countryUrl)
      .then(response => {
        console.log('promise fullfilled', response.data)
      })
      .catch(error => {
        console.log('promise rejected', error.response)
      })
  }, [countryUrl])*/

  const handleSearchChange = (event) => {
    const searchResults = CountryFilter(countryList, event.target.value)
    setSearchName(event.target.value )
    if(event.target.value !== '') {
      setResults(searchResults)
    } else {
      setResults([])
    }
  }

  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} />
      <Results 
        countries={results}
        searchName={searchName}
        setSearchName={setSearchName}
        setResults={setResults}
        countryList={countryList}
      />
    </div>
  )
}

export default App
