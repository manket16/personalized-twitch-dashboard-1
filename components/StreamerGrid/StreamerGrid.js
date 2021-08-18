import React,  {useEffect} from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({ channels, setChannel }) => {
  //Actions
  const removeChannelAction = channelId =>() => {
    console.log('Removing channel...')

    setChannel(channels.filter(channel => channel.id !==channelId))



  }

  const renderGridItem = channel =>(
    <div key ={ channel.id} className={styles.gridItem}>
    <button onClick={removeChannelAction(channel.id)}>X</button>
      <Image layout="fill" src={channel.thumbnail_url}/>

      <div className= {styles.gridItemContent}>
      <p>{channel.display_name}</p>
      {channel.is_live && <p>🔴 Live Now!</p>}
      {!channel.is_live && <p>⚫ Offline</p>}
      </div>
    </div>
  )

  //useEffect
  useEffect(( )=>{
    console.log('CHANNELS: ', channels)
  }, [channels])

  return (
    <div className={styles.container}>
      <h2> Manket's Twitch Dashborad 💻</h2>
      <div className={styles.gridContainer}>
      {channels.map(renderGridItem)}
      </div>
    </div>

  )
}
export default StreamerGrid