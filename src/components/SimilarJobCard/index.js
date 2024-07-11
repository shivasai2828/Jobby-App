import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="logo-title-container-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-number">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-description-title">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-jobtype-container">
        <div className="icon-container">
          <IoLocationSharp className="type-icon" />
          <p className="type-text">{location}</p>
        </div>
        <div className="icon-container">
          <BsFillBriefcaseFill className="type-icon" />
          <p className="type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
