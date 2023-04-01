import styled from "styled-components";
export const Price = styled.div`
  text-decoration: ${(props) => (props.isValid ? "none" : "line-through")};
  color: ${(props) => (props.isValid ? "initial" : "red")};
`;
