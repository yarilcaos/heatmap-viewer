import { ChangeEvent, useState } from "react";
import { QC_Model } from "../models/QC_Model";



const HeatMap=({data,metric} : {data:any,metric:any})=>{
//function HeatMap(data: any) {


    function DrawTable() {
        var dataInCols = data.reduce((r: any, a: QC_Model) => {
            r[a.Metadata_Col] = r[a.Metadata_Col] || [];
            r[a.Metadata_Col].push(a);
            return r;
        }, {});

        var dataInRows = data.reduce((r: any, a: QC_Model) => {
            r[a.Metadata_Row] = r[a.Metadata_Row] || [];
            r[a.Metadata_Row].push(a);
            return r;
        }, {});

       

        return <>
            <thead>
                <tr><th></th>{Object.keys(dataInRows).map(rowKey => (<th> {rowKey}</th>))}</tr>
            </thead>
            <tbody>
                {Object.keys(dataInCols).map(rowKey => (
                    <tr key={rowKey}>
                        <th>{rowKey}</th>
                        {dataInCols[rowKey].map((model: any) => (
                            DrawTD(model)
                        ))}
                    </tr>
                ))}
            </tbody>
        </>

        // return <tbody>
        //     { dataInRows.map((row:any) => {
        //      //   {DrawRow(row)}
        //     })}
        // </tbody>
    }

  
    function DrawCellCountTD(cell: QC_Model) {
        const min = 300;
    const max = 1800;
    const minColor = [255, 255, 255]; // White
    const maxColor = [255, 0, 0]; // Blue
    
    // Clamp value within range
    const clampedValue = Math.max(min, Math.min(max, cell.QC_cell_count));
    const ratio = (clampedValue - min) / (max - min);
    const red=Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
    const green=Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
    const blue=Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));

    const color = `rgb(${red}, ${green}, ${blue})`;
        return <td 
        className="heatmap_cell has-tooltip-arrow has-tooltip-multiline" 
        style={{backgroundColor: color}}>
            {cell.QC_cell_count}
            {DrawTooltip(cell)}
        </td>
    }
    
    function DrawCellCountCovTD(cell: QC_Model) {
        var color = cell.QC_cell_count_cov>0? ColorIfPositive():ColorIfNegative();
        return <td 
        className="heatmap_cell has-tooltip-arrow has-tooltip-multiline" 
        style={{backgroundColor: color}}>
            {Math.round(cell.QC_cell_count_cov*10)/10}
            {DrawTooltip(cell)}
        </td>

        function ColorIfPositive() {
            const min = 0;
            const max = 3;
            const minColor = [255, 255, 255]; // White
            const maxColor = [0, 255, 0]; // Blue

            // Clamp value within range
            const clampedValue = Math.max(min, Math.min(max, cell.QC_cell_count_cov));
            const ratio = (clampedValue - min) / (max - min);
            const red = Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
            const green = Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
            const blue = Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));
            const color = `rgb(${red}, ${green}, ${blue})`;
            return color;
        }

        function ColorIfNegative() {
            const min = 0;
            const max = 3;
            const minColor = [255, 255, 255]; // White
            const maxColor = [255, 0, 0]; // Blue

            // Clamp value within range
            const clampedValue = Math.max(min, Math.min(max, -cell.QC_cell_count_cov));
            const ratio = (clampedValue - min) / (max - min);
            const red = Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
            const green = Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
            const blue = Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));
            const color = `rgb(${red}, ${green}, ${blue})`;
            return color;
        }
    }
    function DrawCovFailedTD(cell: QC_Model) {
        var color = cell.QC_cov_failed? ColorIfPositive():ColorIfNegative();
        return <td 
        className="heatmap_cell has-tooltip-arrow has-tooltip-multiline" 
        style={{backgroundColor: color}}>
            {cell.QC_cov_failed?"Fail":"-"}
            {DrawTooltip(cell)}
        </td>

        function ColorIfNegative() {
            return`rgb(${255}, ${255}, ${255})`;
        }
        function ColorIfPositive() {
            return`rgb(${255}, ${106}, ${106})`;
        }
    }

    function DrawPositionEffectTD(cell: QC_Model) {
    const min = 0.05;
    const max = .85;
    const minColor = [255, 255, 255]; // White
    const maxColor = [0, 0, 255]; // Blue
    
    // Clamp value within range
    const clampedValue = Math.max(min, Math.min(max, cell.QC_position_effect));
    const ratio = (clampedValue - min) / (max - min);
    const red=Math.round(minColor[0] + ratio * (maxColor[0] - minColor[0]));
    const green=Math.round(minColor[1] + ratio * (maxColor[1] - minColor[1]));
    const blue=Math.round(minColor[2] + ratio * (maxColor[2] - minColor[2]));

    const color = `rgb(${red}, ${green}, ${blue})`;
        return <td 
        className="heatmap_cell has-tooltip-arrow has-tooltip-multiline" 
        style={{backgroundColor: color}}>
            { Math.round(cell.QC_position_effect*100)/100}
            {DrawTooltip(cell)}
        </td>
    }
    function DrawTD(model: any) {
        // <option value={"QC_cell_count"}>QC Cell count</option>
        // <option value={"QC_cell_count_cov"}>QC Cell Count Cov</option>
        // <option value={"QC_cov_failed"}>QC Cov Failed</option>
        // <option value={"QC_position_effect"}>QC Position Effect</option>
        if(metric==="QC_cell_count")
            return DrawCellCountTD(model);
        if(metric==="QC_cell_count_cov")
            return DrawCellCountCovTD(model);
        if(metric==="QC_cov_failed")
            return DrawCovFailedTD(model);
        if(metric==="QC_position_effect")
            return DrawPositionEffectTD(model);
        return <td>error with the metric selected</td>
    }
    return <div className="">
    
        <section className="section">
            <div className="columns is-centered">
                    <div className="table-container is-hcentered">
                        <br></br><br></br>
                        <table className="table is-bordered">
                            {DrawTable()}
                        </table>
                    </div>
            </div>
        </section>
    </div>

    function DrawTooltip(cell: QC_Model) {
        return <div className="card tooltip-card">
            <div className="card-content">
                <div className="content tooltip-content">
                    <h1 className="title">Well {cell.Metadata_Well}</h1>
                    <b>Pert. ID :</b>{cell.Metadata_perturbation_id}<br />
                    <b>Pert. Type: </b>{cell.Metadata_perturbation_type}<br />
                    <b>Cell count:</b> {cell.QC_cell_count}<br />
                    <b>Cov Failed:</b> {cell.QC_cov_failed ? "True" : "False"}<br />
                    <b>Cell count cov</b><br /> {cell.QC_cell_count_cov}<br />
                    <b>Pos.Eff.</b><br /> {cell.QC_position_effect}<br />
                </div>
            </div>
        </div>;
    }
};

export default HeatMap;