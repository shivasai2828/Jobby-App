import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    packagePerAnnum,
  } = jobDetails
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="location-package-container">
          <div className="icon-container">
            <IoLocationSharp className="type-icon" />
            <p className="type-text">{location}</p>
          </div>
          <div className="icon-container">
            <BsFillBriefcaseFill className="type-icon" />
            <p className="type-text">{employmentType}</p>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <h1 className="job-description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
