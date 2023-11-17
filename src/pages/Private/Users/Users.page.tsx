import { FC } from "react";

import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectAuth } from "../../../redux";

import { UnauthorizedPage } from "../../Status/Unauthorized.page";
import { ValidRoles } from "../Common/models/valid-roles.model";

interface Props {
  allowedRoles: ValidRoles[];
}

const Users: FC<Props> = ({ allowedRoles }) => {
  const { user } = useSelector(selectAuth);

  if (user && !allowedRoles.includes(user.role.name as ValidRoles)) {
    return <UnauthorizedPage />;
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
};

export default Users;
