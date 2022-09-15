import preloader from './bar.gif'

export const Preloader = () => {
  return (
    <div>
      <img src={preloader} alt='preloader' style={{ display: 'block', margin: '0 auto' }} />
    </div>
  )
}
