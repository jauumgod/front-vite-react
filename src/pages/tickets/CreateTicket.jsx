import FormTicket from '../../components/FormTicket.jsx'



const CreateTicket =() =>{

    return(
    <div className=" min-h-screen w-full bg-slate-800 flex justify-center">
        <div className='w-[700px]'>
            <h2 className=" text-slate-100 font-bold text-center text-2xl">Novo Ticket</h2>
            <FormTicket/>
        </div>  
    </div>
    )
}

export default CreateTicket;