
import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import hero_image from './../assets/3d_medicine_prescription_and_pills.png'

const HomeScreen= ({handlerOpenPage} : {handlerOpenPage:any})=> {
    function GoViewData(){
        handlerOpenPage("DataLoading");
      }
    return  <section className="hero is-full">
            <div className="hero-body">
                <div className="columns is-vcentered">
                    <div className="column is-5-tablet is-6-desktop">
                        <p className="title">Welcome to Heat Map Viewer </p>
                        <p className="subtitle">This is a simple medical app that allows users to load data from a 
                        <br/>1536-well microtiter plate and visualize the data as a heatmap. </p>

                        <div className='has-text-centered'>
                            <button className='button is-primary is-medium' onClick={GoViewData}>Load new data</button>
                        </div>
                    </div>
                    <div className="column is-7-tablet is-5-desktop">
                        <figure className="image is4by3 floatingImage">
                            <img src={hero_image} alt=''/>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
};

export default HomeScreen;