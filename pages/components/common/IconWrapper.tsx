import styled from "styled-components";
import { FunctionComponent, ReactNode } from "react";
import { ElementSizes } from "types";

const StyledButton = styled.button`
  border: none;
  background-color: white;
  margin-right: 32px;
`;

interface IconWrapperProps {
  size?: ElementSizes;
  onClick?: (e: MouseEvent) => void;
  icon: ReactNode;
}

const SizeMap: Record<ElementSizes, number> = {
  sm: 16,
  md: 32,
  lg: 48,
};

const IconWrapper: FunctionComponent<IconWrapperProps> = ({
  size = ElementSizes.md,
  icon: Icon,
  onClick,
}) => {
  const pixels = SizeMap[size];
  return (
    <StyledButton onClick={onClick}>
      {/* @ts-ignore */}
      <Icon size={pixels} />
    </StyledButton>
  );
};

export default IconWrapper;