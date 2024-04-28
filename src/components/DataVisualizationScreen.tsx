
import React, { ChangeEvent, useState } from 'react';

import HeatMap from './Heatmap';

const DataVisualizationScreen=({data} : {data:any})=>{

    const [heatMapConfig, setHeatMapConfig] = useState({
        metric:"QC_position_effect"
      });

    function handleMetricChange(event: ChangeEvent<HTMLSelectElement>): void {
        setHeatMapConfig({metric: event.target.value});
       // console.log(event.target.value);
    }
    return <div >
        <div className='container'>
            <br></br>
            <br></br>
            <p className="title">Heat Map Viewer: {heatMapConfig.metric} </p>
            <br></br>
            {heatMapConfig.metric==="QC_cell_count"?
              <p className='subtitle'>For the cell count metric, a red scale is utilized to visualize the ranges of different wells.</p>:null}
            {heatMapConfig.metric==="QC_cell_count_cov"?<p className='subtitle'>
            For the cell count cov metric, a red versus green color  is utilized to visualize the ranges of different wells and indicate its range from positive to negative.</p>:null}
            {heatMapConfig.metric==="QC_cov_failed"?<p className='subtitle'>
                In the cell faied case we use a red scale to show the failed</p>:null}
            {heatMapConfig.metric==="QC_position_effect"?<p className='subtitle'>
                For the position effect metric, a blue scale is utilized to visualize the ranges of different wells.</p>:null}
            <br/>
            {data===null?<p className='subtitle'> At the moment, there is no available data. Please upload new data and try again. </p>: null }
        </div>
        <div className="container">
            <div className="select">
                <select onChange={handleMetricChange}>
                    <option value={"QC_position_effect"}>QC Position Effect</option>
                    <option value={"QC_cell_count"}>QC Cell count</option>
                    <option value={"QC_cell_count_cov"}>QC Cell Count Cov</option>
                    <option value={"QC_cov_failed"}>QC Cov Failed</option>
                </select>
            </div>
        </div>
        {data===null?null: <HeatMap data={data} metric={heatMapConfig.metric} />}
    </div>
};

export default DataVisualizationScreen;
