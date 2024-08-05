import Country from './Country'

const Results = ({countries, searchName, setSearchName, setResults, countryList}) => {
    
    if(searchName) {
        if(countries.length === 1){
            return(
                <Country 
                    country={countries[0]}
                    showInfo={true}
                    setSearchName={setSearchName}
                    setResults={setResults}
                    countryList={countryList}
                />
            )
        } else if (countries.length >= 2 && countries.length <=10) {
            return (
                <div>
                    {
                        countries.map(e => <Country 
                            key={e.cca3}
                            country={e}
                            showInfo={false} 
                            setSearchName={setSearchName}
                            setResults={setResults}
                            countryList={countryList}
                        />)
                    }
                </div>
            )    
        } else if (countries.length > 10) {
            return (
                <div>Too many matches, specify another filter</div>
            )
        }
    }

    return(<div></div>)
}

export default Results