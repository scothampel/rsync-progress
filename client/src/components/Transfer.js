import { useEffect, useState } from 'react'
import '../styles/Transfer.css'

export default function Transfer({ name, files, progress, complete, id }) {
  const [currentFile, setCurrentFile] = useState('')
  const [currentProgress, setCurrentProgress] = useState('')

  useEffect(() => {
    setCurrentFile(files[files.length - 1])
    setCurrentProgress(progress[progress.length - 1].match(/\S+/g))
  }, [files, progress])

  return (
    <div className='Transfer mb-3' >
      <div className='card'>
        <div className='card-body position-relative pt-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title pb-1 overflow-ellipsis m-0'>{name}</h5>
            { complete ? <i class="bi bi-x-lg fs-4"></i> : <i class="bi bi-chevron-down fs-4"></i> }
          </div>
          {!complete && <button className='btn p-0 fs-3 w-100 h-100 position-absolute top-0 end-0' type='button' data-bs-toggle='collapse' data-bs-target={`#files-${id}`}></button>}
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
          <div className='collapse' id={`files-${id}`}>
            <ul className='list-group mt-3'>
              {
                files.map((v, i) => {
                  return (
                    <li className='list-group-item d-flex justify-content-between'>
                      <p className='overflow-ellipsis w-75 m-0'>{v}</p>
                      { i !== files.length - 1 && <i class="bi bi-check float-end"></i> }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}