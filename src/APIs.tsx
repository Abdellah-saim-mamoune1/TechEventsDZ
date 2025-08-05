import axios from "axios";

export async function GetAllSections(){
    try{
     const data=await axios.get("https://filesmanagementapp-g3f8djcxgubja3c6.spaincentral-01.azurewebsites.net/api/SectionsManagement/GetAllSections");
     console.log(data.data);
     return data.data;
    }catch(error){
     return false;
    }

}

export async function GetItemsBySection(Id:number){
    try{
     const data=await axios.get(`https://filesmanagementapp-g3f8djcxgubja3c6.spaincentral-01.azurewebsites.net/api/ItemsManagement/GetAllItemsBySectionId/${Id}`);
      
     return data.data;
    }catch(error){
     return false;
    }

}


export async function SearchtemBySection(SectionId:number,Query:string){
    try{
     const data=await axios.get(`https://localhost:7059/api/ItemsManagement/SearchItemBySection&Name&Description/${SectionId},${Query}`);

     return data;
    }catch(error){
     return false;
    }

}

export async function Searchtem(Query:string){
    try{
     const data=await axios.get(`https://localhost:7059/api/ItemsManagement/SearchItemByName&Description/${Query}`);

     return data;
    }catch(error){
     return false;
    }

}


export async function AddNewSection(Name:string){
    try{
     const data=await axios.post(`https://localhost:7059/api/SectionsManagement/AddNewSection/${Name}`);
     return data.data;
    }catch(error){
     return false;
    }

}


export async function DeleteSection(id:number){
    try{
     const data=await axios.delete(`https://localhost:7059/api/SectionsManagement/DeleteSection/${id}`);
     return data.data;
    }catch(error){
     return false;
    }

}



export async function UpdateSection(id:number,name:string){
    try{
     const data=await axios.put(`https://localhost:7059/api/SectionsManagement/UpdateSectionName/${id},${name}`);
     return data.data;
    }catch(error){
     return false;
    }

}


export interface UpdateItem{
    id:number,
    title:string,
    description:string,
    file:File
}


export interface AddItem{
    type:string,
    sectionId:number,
    title:string,
    description:string,
    file:File
}

export async function AddItem(form:AddItem){
    try{
     const data=await axios.post('https://localhost:7059/api/ItemsManagement/AddNewItem/',form);
     return data.data;
    }catch(error){
     return false;
    }

}



export async function UpdateItem(form:UpdateItem){
    try{
     const data=await axios.put('https://localhost:7059/api/ItemsManagement/UpdateItem/',form);
     return data.data;
    }catch(error){
     return false;
    }

}

export async function DeleteItem(id:number){
    try{
     const data=await axios.delete(`https://localhost:7059/api/ItemsManagement/DeleteItemById/${id}`);
     return data.data;
    }catch(error){
     return false;
    }

}