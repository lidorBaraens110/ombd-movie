import axios  from 'axios';

const instance=axios.create({
    baseURL:'http://localhost:5000/api',
    method:'GET',
})


const getData=async(url:string)=>{
    try {
        const data= await instance.get(url)
        return data.data;
    }catch(err){
        console.log(err)
    }
}

export {
    getData
}