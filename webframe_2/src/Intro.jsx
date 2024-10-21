import React, { useState, useEffect } from "react";
import { Skeleton, Alert } from "antd";
import "./App.css"; // Import the CSS file
import diagramImg from "./assets/front_image.png";
import NetworkImg from "./assets/Network.png";

const Intro = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="home-container">
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            <div className="grid-container">
              <div className="grid-item content-section">
                <p className="large-text">
                  Predicting chemical ecotoxicity by learning latent space
                  chemical representations.
                </p>
                {/* <p className="medium-text">
                  The utilities of Ecotoxicity includes:
                </p> */}
                {/* <ul className="small-text"> */}
                <p className="small-text">
                  We developed an autoencoder model as an alternative approach
                  for more accurate chemical ecotoxicity (HC50) prediction. Our
                  autoencoder model effectively learned lower dimensional
                  chemical representations from higher dimensional chemical
                  physiochemical features and outperformed other dimension
                  reduction methods and machine learning models.
                </p>
                <p className="small-text">
                  We developed this interactive website for HC50 prediction
                  using our trained autoencoder model. Please navigate to the
                  Model page for HC50 prediction.
                </p>
                {/* <li>
                    Autoencoder outperformed other dimension reduction methods.
                  </li>
                  <li>
                    Autoencoder prediction results were competitive with other
                    machine learning models.
                  </li> */}
                {/* </ul> */}
              </div>
              {/* <div className="grid-item image-section">
                <img src={NetworkImg} className="cover-image" width="250" />
              </div> */}
            </div>
            <p className="small-text">
              To learn more, please read our paper: Gao F, Zhang W, Baccarelli
              AA, Shen Y. Predicting chemical ecotoxicity by learning latent
              space chemical representations. Environment International. 2022.
              163:107224. PMID: 35395577; PMCID: PMC9044254. DOI:{" "}
              <a href="https://www.sciencedirect.com/science/article/pii/S0160412022001507">
                https://doi.org/10.1016/j.envint.2022.107224
              </a>
            </p>
            <div className="diagram-section">
              <img src={diagramImg} className="diagram-image" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Intro;
