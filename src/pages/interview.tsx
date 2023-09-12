import { useEffect, useState } from "react";

export default function Home(){

  const[prompt,setPrompt] = useState("");
  const[messages, setMessages] = useState<{role:string,content:string}[]>([]);
  const[initialRender, setInitialRender] = useState(true);
  const[clicked, setClicked] = useState(false);


  /*
    Once the page loads response will be collected. Also when prompt is inserted in messages
    the response will be collected. The vars clicked and initialRender helps to avoid infinite reloads
  */

  useEffect(()=>{

    if(initialRender){
      setInitialRender(false);
      getResponse();
    } 
    else{
      if(clicked){
        getResponse();
        setClicked(false);
      }
    }

  },[messages])


  //Function which gets response from the backend, this will be invoked only when message state is modified.

  async function getResponse(){

    try{
      const res = await fetch('/api/response', {
        method: 'POST',
        headers:{
          'Content-Type' : "application/json",
        },
        body: JSON.stringify({messages}),
      });

      const data = await res.json();
      const response = data.response;
      console.log(response);
      setMessages([...messages, {'role':'assistant', 'content':response}]);
    }
    catch(error){
      console.error(error);
    }

    
  }

  //function to handle submit action
  function handleSubmit(){
    setClicked(true);
    setMessages([...messages, {'role':'user' , 'content' : prompt}]);
    setPrompt("");
  }

  return (
    <>    

          <div className="relative">

            <div className="h-16 text-center text-3xl font-bold flex flex-col justify-center w-screen my-5">
                    INTERVIEW BUDDY

            </div>


            <div className="h-auto w-auto mx-3 my-4 px-3 py-4">
                {
                  messages.map((m,ind)=>

                      <div className="h-auto shadow-2xl text-lg  w-auto mx-2 my-4 p-6 border border-white rounded-2xl"
                          key={ind}>
                        {`${m.role == 'assistant' ? "A.I" : "You"} :  ${m.content}`}

                      </div>
                  )
                }
            </div>

              <div className="sticky bottom-0 mb-5 py-4 px-60 w-screen bg-black">

                <input className="text-black px-2 py-2 h-20 w-10/12 rounded-xl mr-4"
                  value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
              
                
                <button className="rounded-full shadow-inner cursor-pointer bg-white text-black font-semibold w-auto h-auto px-2 py-1"
                  onClick={handleSubmit}> SUBMIT</button>

              </div>

            

            

          </div>
         
    </>
  )
  
}