import axios from "axios";
import { IContactUs, IEventRequestAdd, IStayNotified } from "./Interfaces";

export async function AddEventRequestAPI(data:IEventRequestAdd ){

try{

  await axios.post("https://localhost:7173/api/user/events/request/",data);
  return true;
   
 } catch(error){
  return false;

}
  
}


export async function StayNotifiedAPI(data:IStayNotified ){

try{

  await axios.post("https://localhost:7173/api/user/events/stay-notified/",data);
  return true;
   
 } catch(error){
  return false;

}
  
}



export async function ContactUsAPI( data:IContactUs ){

try{

  await axios.post("https://localhost:7173/api/user/events/contact-us/",data);
  return true;
   
 } catch(error){
  return false;

}
  
}


export async function GetPaginatedEventsAPI(){

try{

  var response=await axios.get("https://localhost:7173/api/user/events/1&10");
  return response.data.data;
   
 } catch(error){
  return false;

}
  
}