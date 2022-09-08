import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';




function App() {
  const [testimonies, setTestimonies] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0)

  const getTestimonies = async () =>{
    setLoading(true)
    await axios.get('https://testimonialapi.toolcarton.com/api')
    .then(resp =>{
      setTestimonies(resp.data);
      setLoading(false)
    })
    .catch(err =>{
      setError(err)
    })
  }

  const increment = () =>{
    (count == 9 ? setCount(0): setCount(count + 1))
  }

  const decrement = () =>{
    (count == 0? setCount(9): setCount(count - 1))
  }

  useEffect(()=>{
    getTestimonies()
  },[])

  return (
    <div className='testimonies'>

      {error && <p>Sorry, error while fetching resource</p>}

      {!loading && <div className='container'>
        <div className='row align-items-center'>
          <div className='col-auto'>
            <button onClick={decrement}>&#171;</button>
          </div>
          
          <div className='col-auto'>
            <div className='card'>
              <img src={testimonies[count].avatar} className='cardImage' alt='Avatar'/>
              <div className='card-body'>
                <h3 className='card-title fw-bold'>{testimonies[count].name}</h3>
                <h1>{testimonies[count].rating} / 5</h1>
                <h5>{testimonies[count].designation}</h5>
                <p>{testimonies[count].location}</p>
                <p className='card-text fst-italic'>"{testimonies[count].message}"</p>
                
              </div>
            </div>
          </div>

          <div className='col-auto'>
            <button onClick={increment}>&#187;</button>
          </div>
        </div>
      </div>
      }
    </div> 
  );
}

export default App;
