import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})
    useEffect(() => {
        let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        fetch(url)
        .then((res) => res.json())
        .then((res) => setData(res[currency]))
        console.log(data);
        
    }, [currency])
    console.log(data);

    return data;
}
// Why return only data instead of [data, setData]?
// The purpose of this custom hook (useCurrencyInfo) is to fetch exchange rate data based on a given currency.
// The hook handles fetching and updating data internally.
// The component using this hook should not modify data manually. Allowing setData to be exposed could lead to unintended modifications.
// The component using this hook should only consume the data, not manage how it's fetched.


// When should we return [data, setData]?
// We should return [data, setData] if:
//  The consumer needs control over data, like resetting or modifying it manually.
//  The hook is not just fetching data, but also allowing modifications (e.g., form input hooks).
export default useCurrencyInfo;