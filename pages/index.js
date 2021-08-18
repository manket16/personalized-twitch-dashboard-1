// Main entry point of your app
import React, { useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StreamerGrid from '../components/StreamerGrid'

const Home = () => {
  //state
  const [favoriteChannels, setFavoriteChannels] = useState([])

  const addStreamChannel = async event => {
    event.preventDefault()
    const { value } = event.target.elements.name
    if(value){
      console.log('Input: ', value)

      //call Twitch Seach API
      const path = `https://${window.location.hostname}`
      
      const response = await fetch(`${path}/api/twitch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: value})


      })
      const json = await response.json()
      console.log("From the server: ", json.data)

      
    
      setFavoriteChannels(prevState => [...prevState, json.data])

      event.target.elements.name.value=" "

    }
    
  }
  //Render Methods
  const renderForm = () => (
    <div className={styles.formContainer}>
    <form onSubmit={addStreamChannel}>
        <input id="name" placeholder="Username" type="text" required />
        <button type="submit">Add Streamer</button>
      </form>
    </div>



  )
  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
        {renderForm()}
        <StreamerGrid channels = {favoriteChannels} setChannel={setFavoriteChannels}/>
      </div>
    </div>
  )
}

export default Home