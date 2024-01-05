import React, { useEffect } from 'react'
import about from '../utils/about.jpeg';
import "../utils/style.css";
import Carousel from 'react-bootstrap/Carousel'
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';


const HomePage = () => {

  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const navigate1 = useNavigate()
  useEffect(() => {
    if (email === "null") navigate1('/login')
  }, [email])

  console.log(email);
  const testimonials = [
    {
      id: 1,
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      author: 'Jane Doe',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more testimonials as needed
  ];

  const navigate = useNavigate()
  useEffect(() => {
    if (email === "null") navigate('/login')
  }, [email])


  return (
    <div >


      <NavBar active="home" email={email} />

      <div>
        <Carousel fade data-bs-theme="light">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
              alt="First slide"
              height={500}
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg"
              alt="Second slide"
              height={500}
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wowslider.com/sliders/demo-93/data1/images/landscape.jpg"
              alt="Third slide"
              height={500}
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <section className='section2'>
        <div className='section2-heading'>
          <h1>About Us</h1>
          <hr />
        </div>
        <div className='section2-body'>
          <div className='section2-leftside'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className='section2-rightside'>
            <img src={about} alt='' />
          </div>
        </div>

      </section>

      <section className='section3'>
        <div className='section3-heading'>
          <h1>Testimonials</h1>
          <hr />
        </div>
        <div id="carouselExampleInterval" class="carousel slide testimonial" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
              <div className='testimonial-item'>
                <div class="card">
                  <div class="card-header">
                    Client 1
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>A well-known quote, contained in a blockquote element.</p>
                      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <div className='testimonial-item'>
                <div class="card">
                  <div class="card-header">
                    Client 2
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>A well-known quote, contained in a blockquote element.</p>
                      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div className='testimonial-item'>
                <div class="card">
                  <div class="card-header">
                    Client 3
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>A well-known quote, contained in a blockquote element.</p>
                      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </section>


    </div>
  )
}

export default HomePage
