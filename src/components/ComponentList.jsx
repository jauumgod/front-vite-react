import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { TicketIcon } from "lucide-react";

import { Link } from "react-router-dom";
 
const  ComponentList=(props)=>{
  return (
    <Card className="mt-6 w-96 rounded-md">
      <CardBody>
      <span className="text-3xl text-blue-700">
        <TicketIcon />
      </span>
        <Typography className="font-medium text-2xl mb-2" variant="h5" color="blue-gray" >
          {props.title}
        </Typography>
        <Typography>
           <span className="text-center text-3xl">{props.total}</span>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={props.route} className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Visualizar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ComponentList;