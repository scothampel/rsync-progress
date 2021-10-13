import { useEffect, useState } from 'react'
import '../styles/Transfer.css'

export default function Transfer({ name, files, progress, complete }) {
  const [currentFile, setCurrentFile] = useState('')
  const [currentProgress, setCurrentProgress] = useState('')

  useEffect(() => {
    setCurrentFile(files[files.length - 1])
    setCurrentProgress(progress[progress.length - 1].match(/\S+/g))
  }, [files, progress])

  return (
    <div className='Transfer mb-3' >
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title w-75 pb-1 overflow-ellipsis'>{name}</h5>
          <div className='d-flex justify-content-between'>
            <p className='card-text mb-0'>{currentFile}</p>
            <span>{currentProgress[3]}</span>
          </div>
          <div className='progress'>
            <div className={`progress-bar progress-bar-striped progress-bar-animated ${complete ? 'bg-success' : ''}`} role='progressbar' style={{ width: currentProgress[1] }}>
              {currentProgress[1]} / {currentProgress[0]}
            </div>
            {!complete && <div className='progress-bar bg-secondary' role='progressbar' style={{ width: `${100 - parseInt(currentProgress[1])}%` }}>{currentProgress[2]}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}