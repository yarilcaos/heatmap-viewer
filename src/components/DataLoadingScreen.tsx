
import React, { ChangeEvent, useState } from 'react';
import parseCSV from './../services/CSVParser';

const DataLoadingScreen= ({handlerOpenPage, handlerSetData} : {handlerOpenPage:any,handlerSetData:any})=> {
    const [data, setFileName] = useState({
        fileName: "",
        validation:"",
        success:""
      });

      function GoViewData(){
        handlerOpenPage("DataVisualization")
      }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        if (event.target.files==null) return;
        var filename=event.target.files[0].name;
        var extension=filename.split(".")[1];
        var validation="";
        if(extension.toLowerCase()!=="csv"){
            validation="*The file must be an .csv file"
        }
     
        if(validation==""){
            await ProcessData(event.target.files[0]);
        }else{
            setFileName({
                ...data,
                fileName:filename,
                validation:validation,
                success:""
            });
    
        }

        async function ProcessData(file: File) {
            try {
                const parsedData = await parseCSV(file);
                setFileName({
                    ...data,
                    fileName: filename,
                    validation: validation,
                    success: "The file was successfully loaded, with " + parsedData.length + " records"
                });
                handlerSetData(parsedData)
                
            } catch (error) {
                setFileName({
                    ...data,
                    fileName: filename,
                    validation: 'Error parsing CSV:' + error,
                    success:""
                });
                console.error();
            }
        }
    }


    return <div className='container'>
        <br></br>
        <br></br>
        <br></br>
        <div className="columns is-centered">
            <div className="column is-half-tablet is-half-desktop">
                <p className="title">Please select a *.CSV file </p><br />
                <p className="subtitle">Ensure error handling for incorrect file types or corrupt data.  </p>
                <p className="subtitle">Parse the CSV file and validate its format to match the expected structure. </p>
            </div>
            <div className="column is-half-tablet is-half-desktop" >
                <div className='is-centered'>
                    <div className="file has-name is-boxed">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange={handleFileChange}/>
                            <span className="file-cta">
                            <span className="file-label"> Choose a file… </span>
                            </span>
                            <span className="file-name">{data.fileName}  </span>
                        </label>
                    </div>
                            {data.validation===""?null:<p className='help is-danger' >{data.validation}</p>} 
                            {data.success===""?null:<p className='help is-success' >{data.success} <br/><br/> </p>} 
                            {data.success===""?null:<button className='button is-primary' onClick={GoViewData}>View Heat Map</button>} 

                </div>
            </div>
        </div>
    </div>
};

export default DataLoadingScreen;