import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const CardComponent2=({title, body, button})=>{
  return (
    <div className='flex space-x-5 justify-center'>
    <Card className='space-y-5' sx={{ maxWidth: 450 }}>
      <CardActionArea>
        <CardContent>
          <Typography className='text-center text-gray-800'>
            <span className='font-bold'>{title}</span>
          </Typography>
          <Typography className='text-center text-gray-500'>
            <span className='font-bold text-3xl'>{body}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    </div>
  );
}

export default CardComponent2;