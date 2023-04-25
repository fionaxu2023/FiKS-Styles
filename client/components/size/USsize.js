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
const USSizeChart = () => {
  return (
    <Box width="80%" margin="80px auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: shades.primary[300], color: "white"  }}>
          <TableRow>
  <TableCell align="center" style={{ color: 'white' }}><b>US Size</b></TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Bust (in)</TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Waist (in)</TableCell>
  <TableCell align="center" style={{ color: 'white' }}>Hips (in)</TableCell>
</TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">31</TableCell>
              <TableCell align="center">23.5</TableCell>
              <TableCell align="center">34</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">32</TableCell>
              <TableCell align="center">24.5</TableCell>
              <TableCell align="center">35</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">33</TableCell>
              <TableCell align="center">25.5</TableCell>
              <TableCell align="center">36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">6</TableCell>
              <TableCell align="center">34</TableCell>
              <TableCell align="center">26.5</TableCell>
              <TableCell align="center">37</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">8</TableCell>
              <TableCell align="center">35</TableCell>
              <TableCell align="center">27.5</TableCell>
              <TableCell align="center">38</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">10</TableCell>
              <TableCell align="center">36.5</TableCell>
              <TableCell align="center">29</TableCell>
              <TableCell align="center">39.5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">12</TableCell>
              <TableCell align="center">38</TableCell>
              <TableCell align="center">30.5</TableCell>
              <TableCell align="center">41</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">14</TableCell>
              <TableCell align="center">39.5</TableCell>
              <TableCell align="center">32</TableCell>
              <TableCell align="center">42.5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default USSizeChart;
