import { useEffect, useState } from 'react';
import '../styles/App.css';
import Transfer from './Transfer';

function App() {
  const [transfers, setTransfers] = useState({ current_transfers: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/transfers')
      .then(res => res.json())
      .then(data => {
        setTransfers(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className='container mt-3'>
      {
        !loading &&
        Object.entries(transfers.current_transfers).map((v, i) => {
          return <Transfer key={i} id={i} name={v[0]} files={v[1].file_list} progress={v[1].file_prog} complete={false} />
        })
      }
      {
        !loading &&
        Object.entries(transfers.complete_transfers).map((v, i) => {
          return <Transfer name={v[0]} files={v[1].file_list} progress={v[1].file_prog} complete={true} />
        })
      }
    </div>

  )
}

export default App;
