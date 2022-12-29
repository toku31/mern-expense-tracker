import spinner from '../resources/spinner.gif'

function Spinner() {
  return (
    <div className="register">
    {/* <div className='w-100 mt-20'> */}
      <img width={180} className="text-center mx-auto" src={spinner} alt="Loading..." />
    </div>

    // <div className='loadingSpinnerContainer'>
    //   <div className='loadingSpinner'></div>
    // </div>
  )
}

export default Spinner