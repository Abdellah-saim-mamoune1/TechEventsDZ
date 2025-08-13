import axios from "axios";
import { IEventRequestAdd } from "./Interfaces";

export async function AddEventRequestAPI(data:IEventRequestAdd ){

try{

  await axios.post("https://localhost:7173/api/user/events/request/",data);
  return true;
   
 } catch(error){
  return false;

}
  
}