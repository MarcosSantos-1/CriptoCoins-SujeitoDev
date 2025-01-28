import { useRouteError } from "react-router-dom";


export function PageError() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page" className="min-h-96 w-full mx-auto flex flex-col gap-3 justify-center items-center">
        
          <h2 className="text-5xl font-medium ">Oops! </h2>
          <p className="text-2xl ">Esta página não existe!</p>
      </div>
    );
  }
  
  