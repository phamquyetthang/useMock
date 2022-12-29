import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useMock from './useMock';
import { faker } from '@faker-js/faker';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const {success} = useMock(() => ({ word: faker.lorem.word(), id: faker.datatype.uuid() }), 200)
  const fetchData = useCallback(
    async () => {
      setLoading(true)
      const a = await success({ limit: 10, offset: 0, })
      setLoading(false)
      setData(a as any)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <div className="App">
      <header className="App-header">
      <h1>{JSON.stringify(loading)}</h1>
        {JSON.stringify(data)}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
