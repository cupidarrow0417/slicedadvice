import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { StarIcon } from '@heroicons/react/solid';
import { SvgIcon } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#facc15',
  },
  '& .MuiRating-iconEmpty': {
    color: '#d1d5db',
  },
  '& .MuiRating-iconHover': {
    color: '#facc15',
  },
});

export default function InteractiveRating({setRating}: any) {

  
  return (
      <StyledRating
        name="customized-color"
        defaultValue={5}
        getLabelText={(value: number) => `${value} Rating${value !== 1 ? 's' : ''}`}
        precision={1}
        icon={<SvgIcon component={StarIcon}/>}
        emptyIcon={<SvgIcon component={StarIcon} />}
        onChange={(e:any) => setRating(e.target.value)}
      />
  );
}
