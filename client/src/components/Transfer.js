import '../styles/Transfer.css'

export default function Transfer({ name, files, progress }) {
  return (
    <div className='Transfer' >
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title w-75 pb-1 overflow-ellipsis'>{name}</h5>
          <p className='card-text mb-0'>Test text</p>
              <div className='progress'>
                <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style={{ width: `${progress}%` }}>{`${progress}%`}</div>
                <div className='progress-bar bg-secondary' role='progressbar' style={{ width: `${100 - parseInt(progress)}%` }}>0.00 MB/s</div>
              </div>
        </div>
      </div>
    </div>
  )
}