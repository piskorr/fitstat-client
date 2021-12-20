import { Component } from "react";
import { Container, Paper, Grid, Toolbar } from "@mui/material";
import DateArea from "../components/WeightChart";
import WeightHistory from "../components/WeightHistory";
import Title from "../components/Title";
import api from "../AxiosInstance";

class WeightLogPage extends Component {
  state = {
    weights: [],
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = async () => {
    let data = await api.get(`/users/weight`).then(({ data }) => data);
    console.log(data);
    this.setState({ weights: data });
  };

  render() {
    return (
      <div>
        <Container maxWidth="md" sx={{ mt: 12 }}>
          <Paper elevation={5}>
            <DateArea />
          </Paper>
        </Container>
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <Paper elevation={5}>
              <Toolbar>
                <Title> Weight Log: </Title>
              </Toolbar>
              {WeightHistory(this.state.weights)}
            </Paper>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default WeightLogPage;
