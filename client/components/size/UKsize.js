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

const UKSizeChart = () => {
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h4" textAlign="center" gutterBottom>
        UK Size Chart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>UK Size</b></TableCell>
              <TableCell align="center">Bust (in)</TableCell>
              <TableCell align="center">Waist (in)</TableCell>
              <TableCell align="center">Hips (in)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">30.5</TableCell>
              <TableCell align="center">23</TableCell>
              <TableCell align="center">33.5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">6</TableCell>
              <TableCell align="center">31.5</TableCell>
              <TableCell align="center">24</TableCell>
              <TableCell align="center">34.5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">8</TableCell>
              <TableCell align="center">32.5</TableCell>
              <TableCell align="center">25</TableCell>
              <TableCell align="center">35.5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">10</TableCell>
              <TableCell align="center">34</TableCell>
              <TableCell align="center">26.5</TableCell>
              <TableCell align="center">37</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">12</TableCell>
              <TableCell align="center">36</TableCell>
              <TableCell align="center">28</TableCell>
              <TableCell align="center">39</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">14</TableCell>
              <TableCell align="center">38</TableCell>
              <TableCell align="center">30</TableCell>
              <TableCell align="center">41</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">16</TableCell>
              <TableCell align="center">40</TableCell>
              <TableCell align="center">32</TableCell>
              <TableCell align="center">43</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">18</TableCell>
              <TableCell align="center">42</TableCell>
              <TableCell align="center">34</TableCell>
              <TableCell align="center">45</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UKSizeChart;