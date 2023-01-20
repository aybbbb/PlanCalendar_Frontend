import styled from 'styled-components';

const TemplateBlock = styled.div`
  border: 1px solid #5f3dc4;
  width: 450px;
  height: 935px;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  background: #f8f9fa;
`;

export default function Wrapper({ children }) {
  return <TemplateBlock>{children}</TemplateBlock>;
}
