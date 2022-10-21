import { Box, Container, styled } from "@mui/material";
import { FC, ReactNode } from "react";


const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4, 0)};
`
);

interface PageTitleWrapperProps {
  children: ReactNode;
}

export const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <>
      <PageTitle>
        <Container maxWidth="lg">
          {children}
        </Container>
      </PageTitle>
    </>
  );
};

