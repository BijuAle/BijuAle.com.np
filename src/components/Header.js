import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const Header = () => {
  const HeaderStyle = styled.div`
    margin: 1rem 0 2rem 0;
    border-bottom: 1px solid grey;

    nav li {
      text-align: left;
      border-left: 1px solid grey;
      border: 1px solid grey;
      display: inline-block;
      border-radius: 5%;
    }
    nav ul {
      margin: 0;
      transform: skew(-25deg);
    }
    nav {
      margin-bottom: 0.1rem;
      float: left;
    }

    nav ul li a {
      display: block;
      transform: skew(25deg);
      padding: 0.2rem;
    }

    nav ul li:hover {
      background: burlywood;
    }
    nav ul li a:hover {
      color: purple;
    }
  `

  const MottoStyle = styled.div`
    opacity: 65%;
    font-style: italic;
    float: right;

    p {
      text-align: right;
    }
  `
  return (
    <HeaderStyle>
      <header>
        <nav>
          <div
            style={{
              opacity: "50%",
              fontSize: "1.5rem",
              display: "inline-block",
            }}
          >
            BIJU ALE
          </div>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>

        <MottoStyle>
          <p>
            And you shall know the truth, <br />
            & the truth shall make you free.
            <br />
            &mdash;John 8:32
          </p>
        </MottoStyle>
      </header>
    </HeaderStyle>
  )
}
