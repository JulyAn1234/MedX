import React from 'react';
import { Button } from 'reactstrap';

interface MedicalHistoryProps {
    onSearch:(search:string)=>void;
}

const searchBar: React.FC<MedicalHistoryProps> = ({onSearch}) => {
    const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
          // The Enter key was pressed
          const searchText = e.target.value;
          // You can perform your action when Enter is pressed
          console.log('Enter key pressed with text:', searchText);
          onSearch(searchText);
        }
      };
    return (
        <div className='max-w-md mx-auto'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden px-8">
                <Button className="grid place-items-center h-full w-6 text-gray-300">
                    <img src="/search.png" alt="" />
                </Button>

                <input
                className="peer h-full w-full outline-none text-sm text-gray-700 px-4"
                type="text"
                id="search"
                placeholder="Escribe una CURP..." 
                onChange={()=>{console.log("...")}}
                onKeyPress={handleKeyPress}
                /> 

            </div>
        </div>
    )
};

export default searchBar;
