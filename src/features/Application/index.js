import Container from "@material-ui/core/Container";
import { ApplicationFormTable } from "./ApplicationFormTable";
import { ApplicationInfo } from "./ApplicationInfo";

export const Application = () => {
  return (
    <Container fixed>
      <ApplicationInfo />

      <ApplicationFormTable />
    </Container>
  );
};
