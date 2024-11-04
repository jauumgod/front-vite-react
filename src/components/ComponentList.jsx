import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { TicketIcon } from "lucide-react";

 
const  ComponentList=(props)=>{
  return (
    <Card className="mt-6 w-96 rounded-md">
      <CardBody className="bg-slate-600 border rounded-md">
      <span className="text-3xl text-blue-700">
        <TicketIcon />
      </span>
        <Typography className="font-medium text-2xl mb-2 text-white" variant="h5">
          {props.title}
        </Typography>
        <Typography>
           <span className="text-center text-3xl text-white">{props.total}</span>
        </Typography>
      </CardBody>
    </Card>
  );
}

export default ComponentList;