// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

function App() {
  return <Greeting />
}

export default App
