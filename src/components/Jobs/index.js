import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import ProfileDetails from '../ProfileDetails'
import FilterDetails from '../FilterDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileUserDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeSalaryRange: '',
    employmentTypeChecked: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  updateEmploymentTypesChecked = employmentTypeId => {
    const {employmentTypeChecked} = this.state
    const isTypeChecked = employmentTypeChecked.includes(employmentTypeId)

    const updatedData = isTypeChecked
      ? employmentTypeChecked.filter(type => type !== employmentTypeId)
      : [...employmentTypeChecked, employmentTypeId]
    this.setState({employmentTypeChecked: updatedData}, this.getJobs)
  }

  updateSalaryRange = salaryRangeId => {
    this.setState({activeSalaryRange: salaryRangeId}, this.getJobs)
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileUserDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchBar = searchBarId => {
    const {searchInput} = this.state
    const onSearchChange = event => {
      this.setState({searchInput: event.target.value})
    }
    return (
      <div className="search-bar" id={searchBarId}>
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={onSearchChange}
        />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={() => this.getJobs()}
          aria-label="search-btn"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSideBar = () => {
    const {
      profileUserDetails,
      profileApiStatus,
      activeSalaryRange,
      employmentTypeChecked,
    } = this.state

    return (
      <div className="side-bar">
        {this.renderSearchBar('mobileSearchBar')}
        <ProfileDetails
          profileUserDetails={profileUserDetails}
          profileApiStatus={profileApiStatus}
          getProfileDetails={this.getProfileDetails}
        />
        <hr className="separator" />
        <FilterDetails
          updateSalaryRange={this.updateSalaryRange}
          activeSalaryRange={activeSalaryRange}
          updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
          employmentTypeChecked={employmentTypeChecked}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
      </div>
    )
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeSalaryRange, employmentTypeChecked, searchInput} = this.state
    const employmentTypes = employmentTypeChecked.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs-list">
            {jobsList.map(eachJob => (
              <JobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsBasedOnAPiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page">
          {this.renderSideBar()}
          <div className="jobs-container">
            {this.renderSearchBar('desktopSearchBar')}
            {this.renderJobsBasedOnAPiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
