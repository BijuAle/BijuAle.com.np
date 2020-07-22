import React from "react"
import styled from "styled-components"
// import { Nav } from "./Typography"
import { StyledLink } from "./Typography"

const MenuWrapper = styled.div`
  font-family: "Josefin Slab";
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
    display: flex;
  }

  li {
    display: block;
    float: left;
    padding-left: 0.6rem;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  li:hover,
  li:focus-within {
    cursor: pointer;
  }

  li:focus-within a {
    outline: none;
  }

  ul li ul {
    background: #1a202c;
    margin-left: 0.5rem;
    visibility: hidden;
    opacity: 0;
    min-width: 5rem;
    position: absolute;
    left: 0;
    display: none;
    padding-top: 0.5rem;
    transition: all 2s ease;
  }

  ul li:hover > ul,
  ul li:focus-within > ul,
  ul li ul:hover,
  ul li ul:focus {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  ul li ul li {
    clear: both;
    width: 100%;
    margin-top: 0.3rem;
  }
`
export const Menu = ({ menuLinks }) => (
  <MenuWrapper>
    <nav role="navigation">
      <ul>
        {menuLinks.map(link => (
          <li key={link.name}>
            <StyledLink to={link.link}>{link.name}</StyledLink>
            {link.subMenu && link.subMenu.length > 0 ? (
              <ul>
                {link.subMenu.map(subLink => (
                  <li key={subLink.name}>
                    <StyledLink to={subLink.link}>{subLink.name}</StyledLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  </MenuWrapper>
)
