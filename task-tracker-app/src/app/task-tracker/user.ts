export class Users
{
    id:string;
    name:string;
    task:string;
    date: Date;
   
    constructor(id,name,task, date)
    {
        this.id=id;
        this.name=name;
        this.task=task;
        date();
  
    }
}