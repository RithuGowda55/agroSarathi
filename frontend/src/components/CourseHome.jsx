import React from "react"
import Back from "./Back"
// import CoursesCard from "./CoursesCard"
import "../css/courses.css";
import { coursesCard } from "../dummydata";
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Imort the AuthContext


const CourseHome = () => {
  const {auth} = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Back title='Explore Courses' />
      <section className="coursesCard">
              <div className="container grid2">
                {coursesCard.map((val) => (
                  
                  <div className="items" key={val.id}>
                    <div className="content flex">
                      <div className="left">
                        <div className="img">
                          <img src={val.cover} alt = '' />
                        </div>
                      </div>
                      <div className="text">
                        <h1>{val.coursesName}</h1>
                        <div className="rate">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <label htmlFor="">{``}</label>
                        </div>
                        <div className="details">
                          {val.courTeacher.map((details) => (
                            <>
                            <div className="box" >
                              {/* <div className="dimg">
                                <img src={details.dcover} alt='' />
                              </div> */}
                              <div className="para">
                                <h4>{details.name}</h4>
                              </div>
                            </div>
                            <span>{details.totalTime}</span>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <h3>
                        {val.priceAll} / {val.pricePer}
                      </h3>
                    </div>
                    <a href={val.courseUrl} target="_blank" rel="noopener noreferrer">
                      <button className="outline-btn">ENROLL NOW !</button>
                    </a>
                  </div>
                ))}
              </div>
            </section>
      {/* <OnlineCourses /> */}
    </>
  )
}

export default CourseHome
