import styled from "styled-components";
import { FunctionComponent, ReactNode, MouseEvent } from "react";
import { ElementSizes } from "types";

const StyledButton = styled.button<{ backgroundColor: string }>`
  border: none;
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    cursor: pointer;
  }
`;

interface IconWrapperProps {
  size?: ElementSizes;
  backgroundColor?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  icon: ReactNode;
}

const SizeMap: Record<ElementSizes, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const IconWrapper: FunctionComponent<IconWrapperProps> = ({
  size = ElementSizes.md,
  icon: Icon,
  onClick,
  backgroundColor,
}) => {
  const pixels = SizeMap[size];
  return (
    <StyledButton
      backgroundColor={backgroundColor || "white"}
      onClick={onClick}
    >
      {/* @ts-ignore */}
      <Icon size={pixels} />
    </StyledButton>
  );
};

export default IconWrapper;
