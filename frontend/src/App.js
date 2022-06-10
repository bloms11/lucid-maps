import './App.css';
import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import Register from './components/Register';
import Login from './components/Login';
function App() {
  const myStorage = window.localStorage
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  // const [adjustMap, setAdjustMap] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get("/pins")
        setPins(res.data)
      }catch(err){
        console.log(err)
      }
    }
  getPins()

  }, [])


  const handleClick = (e) => {
    // const [long, lat] = e.lngLat
    // console.log(e.lngLat)
      setNewPlace({
        long: e.lngLat.lng,
        lat: e.lngLat.lat,
      })
  }

    const handleMarkerClick = (id) => {
    // setAdjustMap(true)
    setCurrentPlaceId(id)
    // console.log(adjustMap)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long 
    }
    try{
      const res = await axios.post('/pins', newPin)
      setPins([...pins, res.data])
      setNewPlace(null)
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = () => {
    myStorage.removeItem('user')
    setCurrentUser(null)
  }
  return (
    <Map
    initialViewState={{
      longitude: 17,
      latitude: 46,
      zoom: 6,
    }}
    style={{width: '100%', height: '100vh', overflow: 'hidden' }}
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
    onContextMenu={handleClick}
    doubleClickZoom={true}
  >
    {pins.map(pin =>(

      <div key={pin._id}>
      <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" >
        <Room onClick={()=> handleMarkerClick(pin._id)} style={{cursor: "pointer",fontSize: "50px", color:pin.username === currentUser ? "tomato" : "slateblue"}} />
      </Marker>
      {
        pin._id === currentPlaceId && ( 
      
      <Popup 
        onClose={()=> setCurrentPlaceId(null)} 
        closeOnClick={false} 
        closeButton= {true} 
        longitude={pin.long} 
        latitude={pin.lat} 
        anchor="left">
        <div className='card'>
          <label>Place</label>
          <h2 className='place'>{pin.title}</h2>
          <label>Review</label>
          <p className='desc'>{pin.desc}</p>
          <label>Rating</label>
          <div className='stars'>
            {Array(pin.rating).fill(<Star className='star'/>)}
          </div>
          <label>Information</label>
          <span className='username'>Information Created by <b>{pin.username}</b></span>
        </div>
      </Popup>
        )}
      </div>
      ))}
    {newPlace && (
      <Popup 
        onClose={() => setNewPlace(null)}
        closeOnClick={false}
        closeButton={true} 
        longitude={newPlace.long} 
        latitude={newPlace.lat} 
        anchor="top">
        <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <textarea placeholder='Enter a title' onChange={(e)=>setTitle(e.target.value)} />
            <label>Review</label>
            <textarea placeholder='Tell us something about this place.' onChange={(e)=>setDesc(e.target.value)}/>
            <label>Rating</label>
            <select onChange={(e)=>setRating(e.target.value)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <button className='submitButton' type='submit'>
              Add Pin
            </button>
            <p className='info'>Please make sure you are logged in before adding pin!</p>
          </form>
        </div>
      </Popup>
  )}

  <div className='main-logo'>
    <Room style={{fontSize: '30px'}}/>
    LucidMaps
  </div>

  {currentUser ? (
  <button className='button logout' onClick={handleLogout} >Log Out</button>
  ) : (
    <div className='buttons'>
      <button className='button login' onClick={()=> setShowLogin(true)}>Login</button>
      <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
    </div>
  )}
  {showRegister && <Register setShowRegister={setShowRegister}/>}
  {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
  </Map>
);
}

export default App; 


