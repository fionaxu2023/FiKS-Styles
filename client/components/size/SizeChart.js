import React, { useState } from 'react';
import EUSizeChart from './EUsize';
import UKSizeChart from './UKsize';
import USSizeChart from './USsize';
import { Box, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const SizeChart = () => {
  const [selectedSize, setSelectedSize] = useState('US');

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div>
      <Box width="60%" margin="80px auto">
        <FormControl fullWidth>
          <Select
            value={selectedSize}
            onChange={handleChange}
            placeholder={selectedSize}
          >
            <MenuItem value="EU">EU</MenuItem>
            <MenuItem value="US">US</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </Select>
        </FormControl>
        {selectedSize === 'EU' && <EUSizeChart />}
        {selectedSize === 'UK' && <UKSizeChart />}
        {selectedSize === 'US' && <USSizeChart />}
      </Box>
    </div>
  );
};

export default SizeChart;