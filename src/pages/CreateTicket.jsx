import FormTicket from '../components/FormTicket.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateTicket =() =>{

    return(
        <div className=" min-h-screen w-full bg-slate-800 flex justify-center">
            
            <div className='w-[450px] space-y-4'>
            <h2 className=" text-slate-100 font-bold text-center text-3xl">Novo Ticket</h2>
            <ToastContainer />
            <FormTicket/>  
            </div>  
        </div>
    )
}

export default CreateTicket;