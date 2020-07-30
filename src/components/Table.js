import styled from "styled-components"
import React from "react"

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 1rem;
`

export const Table = ({ children }) => {
  return (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  )
}
