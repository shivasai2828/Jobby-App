import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileDetails = props => {
  const renderProfile = () => {
    const {profileUserDetails} = props
    const {name, profileImageUrl, shortBio} = profileUserDetails

    return (
      <div className="user-profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  const renderProfileFailure = () => {
    const {getProfileDetails} = props

    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          type="button"
          onClick={getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props
  switch (profileApiStatus) {
    case apiStatusConstants.success:
      return renderProfile()
    case apiStatusConstants.failure:
      return renderProfileFailure()
    case apiStatusConstants.inProgress:
      return renderLoader()
    default:
      return null
  }
}
export default ProfileDetails
