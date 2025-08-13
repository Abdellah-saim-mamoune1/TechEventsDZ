export interface IEventRequestAdd{
  name: string;
  organizer: string;
  type: string;
  region: string;
  date: string; 
  url: string;
}

export interface IContactUs{
    
    name:string,
    email:string,
    message:string,
}
export interface IStayNotified{

    name:string;
    account:string;
}

export interface IEventsGet{
     
    id:number;
    name:string;
    type:string;
    organizer:string;
    region:string;
    date:string;
    url:string;
    status:boolean
}

