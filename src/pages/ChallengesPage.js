import { Component } from "react";
import { Container, Paper } from "@mui/material";
import ChallangeList from "../components/ChallangesList";

class ChallangesPage extends Component {
  render() {
    return (
      <div>
        <Container maxWidth="md" sx={{ mt: 12 }}>
          <Paper elevation={5}>
            <ChallangeList />
          </Paper>
        </Container>
      </div>
    );
  }
}

export default ChallangesPage;
