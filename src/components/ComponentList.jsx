import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const ComponentList=({title, body, button})=>{
  return (
    <div className='flex space-x-2 justify-center mb-2'>
    <Card className='space-y-2' sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography className='text-center text-gray-800'>
            <span className='font-bold'>{title}</span>
          </Typography>
          <Typography className='text-center text-gray-500'>
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className='text-center rounded-md bg-blue-300' size="small" color="primary">
          <span className='font-bold'>{button}</span>
        </Button>
      </CardActions>
    </Card>

    </div>
  );
}

export default ComponentList;