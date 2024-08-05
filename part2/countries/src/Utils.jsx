const CountryFilter = (countryList, searchName) => 
    countryList.filter(country => country.name.common.toLowerCase().match(searchName.toLowerCase()))

export default CountryFilter