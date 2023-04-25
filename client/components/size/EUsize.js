import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { shades } from '../../theme';
const EUSizeChart = () => {
  return (
    <Box width="80%" margin="80px auto">
      <TableContainer component={Paper}>
        <Table style={{ fontSize: "1.2rem" }} >
          <TableHead sx={{ backgroundColor: shades.primary[300], color: "white"  }}>
          <TableRow>
  <TableCell align="center" style={{ color: 'white' }}><b>EU Size</b></TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Bust (cm)</TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Waist (cm)</TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Hips (cm)</TableCell>
</TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" >32</TableCell>
              <TableCell align="center">81</TableCell>
              <TableCell align="center">63</TableCell>
              <TableCell align="center">89</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">34</TableCell>
              <TableCell align="center">84</TableCell>
              <TableCell align="center">66</TableCell>
              <TableCell align="center">92</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">36</TableCell>
              <TableCell align="center">88</TableCell>
              <TableCell align="center">70</TableCell>
              <TableCell align="center">96</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">38</TableCell>
              <TableCell align="center">92</TableCell>
              <TableCell align="center">74</TableCell>
              <TableCell align="center">100</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">40</TableCell>
              <TableCell align="center">96</TableCell>
              <TableCell align="center">78</TableCell>
              <TableCell align="center">104</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">42</TableCell>
              <TableCell align="center">100</TableCell>
              <TableCell align="center">82</TableCell>
              <TableCell align="center">108</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">44</TableCell>
              <TableCell align="center">104</TableCell>
              <TableCell align="center">86</TableCell>
              <TableCell align="center">112</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">46</TableCell>
              <TableCell align="center">110</TableCell>
              <TableCell align="center">92</TableCell>
              <TableCell align="center">118</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EUSizeChart;
